'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Loader2, ShieldCheck, Upload } from 'lucide-react';
import { adminClient } from '@/lib/store/admin-client';
import { accessToken, fleetCall } from '@/lib/fleet/client';
import { when } from '@/lib/fleet/logic';
import { parseReleaseFiles } from '@/lib/fleet/manifest';
import type { ReleaseRow, SigningKey } from '@/lib/fleet/types';
import { useFleet } from './FleetShell';
import { Badge, BTN, BTN_QUIET, CARD, ConfirmDialog, Dialog, Empty, ErrorBox, INPUT, PageHeader, Spinner, useLoad } from './ui';

const STATUS_TONE: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700 ring-slate-200', VERIFIED: 'bg-blue-50 text-blue-800 ring-blue-200',
  APPROVED: 'bg-emerald-50 text-emerald-800 ring-emerald-200', REVOKED: 'bg-rose-50 text-rose-800 ring-rose-200',
};
const CATEGORY: Record<string, string> = { app: 'A · App', agent: 'B · Agent', os: 'C · OS (A/B)', bootloader: 'D · Bootloader/EEPROM', peripheral: 'E · Peripheral firmware' };

async function verifyOnServer(id: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('/api/admin/fleet/releases/verify', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${await accessToken()}` }, body: JSON.stringify({ id }) });
  const j = await res.json().catch(() => ({}));
  return res.ok ? { ok: true } : { ok: false, error: j.error ?? j.message ?? `HTTP ${res.status}` };
}

export default function Releases() {
  const { can, act, toast } = useFleet();
  const releases = useLoad(() => fleetCall<ReleaseRow[]>('fleet_releases'));
  const keys = useLoad(() => fleetCall<SigningKey[]>('fleet_signing_keys'));
  const [adding, setAdding] = useState(false);
  const [confirm, setConfirm] = useState<null | { kind: 'approve' | 'revoke'; r: ReleaseRow }>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Software releases" subtitle="Signed offline by the owner, checked by the server, approved by a person. Artifacts live in private storage; only gateways get short-lived links.">
        {can('create_release') && <button type="button" className={BTN} onClick={() => setAdding(true)}><Upload className="h-4 w-4" aria-hidden="true" />New release</button>}
      </PageHeader>
      {err && <ErrorBox error={err} />}
      {releases.error && <ErrorBox error={releases.error} onRetry={releases.reload} />}
      {!releases.data ? <Spinner /> : releases.data.length === 0 ? <Empty>No releases yet. Build and sign one first (docs/fleet/release-signing.md).</Empty> : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>
              <th scope="col" className="px-3 py-2">Release</th><th scope="col" className="px-3 py-2">Category</th><th scope="col" className="px-3 py-2">Channel</th>
              <th scope="col" className="px-3 py-2">Compatibility</th><th scope="col" className="px-3 py-2">Status</th><th scope="col" className="px-3 py-2">Artifact</th><th scope="col" className="px-3 py-2"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody className="divide-y divide-slate-100">{releases.data.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="px-3 py-2"><div className="font-semibold">{r.name}</div><div className="font-mono text-xs">{r.version}</div>
                  <div className="text-xs text-slate-500">{when(r.created_at)} · {r.created_by_email ?? '—'}</div>{r.notes && <details className="text-xs"><summary className="cursor-pointer text-blue-700">Notes</summary><p className="whitespace-pre-wrap">{r.notes}</p></details>}</td>
                <td className="px-3 py-2 text-xs">{CATEGORY[r.category] ?? r.category}</td>
                <td className="px-3 py-2 text-xs">{r.channel}</td>
                <td className="px-3 py-2 text-xs">{r.hardware_family}{r.min_hardware_revision ? ` ≥ rev ${r.min_hardware_revision}` : ''}<br />OS: {r.supported_os.length ? r.supported_os.join(', ') : 'any'}<br />Agent ≥ {r.min_agent_version ?? 'any'}</td>
                <td className="px-3 py-2"><Badge tone={STATUS_TONE[r.status] ?? STATUS_TONE.DRAFT}>{r.status}</Badge>
                  {r.approved_at && <div className="mt-1 text-xs text-slate-500">approved {when(r.approved_at)} by {r.approved_by_email}</div>}
                  {r.verify_error && <div className="mt-1 text-xs text-rose-700">{r.verify_error}</div>}</td>
                <td className="px-3 py-2 text-xs"><span className="font-mono" title={r.sha256 ?? ''}>{r.sha256?.slice(0, 12)}…</span><br />{r.artifact_size ? `${(r.artifact_size / 1_048_576).toFixed(1)} MB` : ''}<br />key {r.signing_key_id}</td>
                <td className="space-y-1 px-3 py-2 text-right">
                  {r.status === 'DRAFT' && can('create_release') && <button type="button" disabled={busy === r.id} className={`${BTN_QUIET} !h-9`} onClick={async () => {
                    setBusy(r.id); setErr(null);
                    const v = await verifyOnServer(r.id); setBusy(null);
                    if (v.ok) toast('Verified: checksum and signature match'); else setErr(`Verification failed: ${v.error}`);
                    releases.reload();
                  }}>{busy === r.id && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Verify</button>}
                  {r.status === 'VERIFIED' && can('approve_release') && <button type="button" className={`${BTN} !h-9`} onClick={() => setConfirm({ kind: 'approve', r })}><ShieldCheck className="h-4 w-4" aria-hidden="true" />Approve</button>}
                  {r.status === 'APPROVED' && can('deploy') && <Link href={`/admin/fleet/deployments/new?release=${r.id}`} className={`${BTN} !h-9`}>Deploy</Link>}
                  {r.status !== 'REVOKED' && can('approve_release') && <button type="button" className={`${BTN_QUIET} !h-9`} onClick={() => setConfirm({ kind: 'revoke', r })}>Revoke</button>}
                </td>
              </tr>))}</tbody>
          </table>
        </div>
      )}

      <section className={CARD} aria-label="Signing keys">
        <h2 className="flex items-center gap-2 text-sm font-semibold"><KeyRound className="h-4 w-4" aria-hidden="true" />Signing keys (public only)</h2>
        <p className="text-xs text-slate-600">The private keys never come here. Gateways trust only the keys installed on them (deployment/release-keys/).</p>
        {!keys.data ? <Spinner /> : keys.data.length === 0 ? <p className="mt-2 text-sm text-slate-600">No key registered yet. Make one with <code>scripts/fleet/sign-release.py keygen</code> on your computer.</p> : (
          <ul className="mt-2 divide-y divide-slate-100 text-sm">{keys.data.map((k) => (
            <li key={k.key_id} className="flex flex-wrap items-center justify-between gap-2 py-2"><span><b>{k.name}</b> <span className="font-mono text-xs">{k.key_id}</span> {k.revoked_at && <Badge tone={STATUS_TONE.REVOKED}>revoked</Badge>}</span>
              {!k.revoked_at && can('manage_credentials') && <button type="button" className={`${BTN_QUIET} !h-8 text-xs`} onClick={async () => {
                if (!window.confirm(`Revoke ${k.name}? Every release signed with it is revoked too.`)) return;
                try { await act(() => fleetCall('fleet_signing_key_revoke', { p_key_id: k.key_id })); toast('Key revoked'); keys.reload(); releases.reload(); } catch (x) { setErr(x instanceof Error ? x.message : String(x)); }
              }}>Revoke</button>}</li>))}</ul>
        )}
        {can('manage_credentials') && <AddKey onDone={() => keys.reload()} />}
      </section>

      {adding && <NewRelease keys={keys.data ?? []} onClose={() => setAdding(false)} onDone={() => { setAdding(false); releases.reload(); }} />}
      {confirm?.kind === 'approve' && <ConfirmDialog title={`Approve ${confirm.r.name} ${confirm.r.version}?`} confirmLabel="Approve for deployment"
        body={<><p>The server verified the artifact&apos;s SHA-256 and the signature. Approving makes it available for deployments (it still goes to no gateway until someone deploys it).</p><p className="text-xs text-slate-500">Channel {confirm.r.channel}. Logged with your name.</p></>}
        typeToConfirm={confirm.r.version} onClose={() => setConfirm(null)} onConfirm={async () => { await act(() => fleetCall('fleet_release_approve', { p_id: confirm.r.id })); toast('Approved'); releases.reload(); }} />}
      {confirm?.kind === 'revoke' && <ConfirmDialog title={`Revoke ${confirm.r.version}?`} danger confirmLabel="Revoke" reason
        body="No gateway will be offered it any more. Gateways already installing finish; nothing is uninstalled." onClose={() => setConfirm(null)}
        onConfirm={async (reason) => { await act(() => fleetCall('fleet_release_revoke', { p_id: confirm.r.id, p_reason: reason })); toast('Revoked'); releases.reload(); }} />}
    </div>
  );
}

function AddKey({ onDone }: { onDone: () => void }) {
  const { act, toast } = useFleet();
  const [name, setName] = useState('');
  const [pub, setPub] = useState('');
  const [err, setErr] = useState<string | null>(null);
  return (
    <form className="mt-3 flex flex-wrap items-end gap-2" onSubmit={async (e) => {
      e.preventDefault(); setErr(null);
      try { const id = await act(() => fleetCall<string>('fleet_signing_key_add', { p_name: name, p_public_key: pub.trim() })); toast(`Key ${id} registered`); setName(''); setPub(''); onDone(); }
      catch (x) { setErr(x instanceof Error ? x.message : String(x)); }
    }}>
      <label className="text-sm font-medium">Name<input required className={`${INPUT} mt-1 !h-10`} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Release key 1 (2026)" /></label>
      <label className="min-w-[18rem] flex-1 text-sm font-medium">Public key (from the .pub file)<input required className={`${INPUT} mt-1 !h-10 font-mono`} value={pub} onChange={(e) => setPub(e.target.value)} pattern="[A-Za-z0-9_\-]{43}" /></label>
      <button type="submit" className={`${BTN_QUIET} !h-10`}>Register key</button>
      {err && <p role="alert" className="w-full text-sm text-rose-600">{err}</p>}
    </form>
  );
}

function NewRelease({ keys, onClose, onDone }: { keys: SigningKey[]; onClose: () => void; onDone: () => void }) {
  const { act, toast } = useFleet();
  const [file, setFile] = useState<File | null>(null);
  const [manifestText, setManifestText] = useState('');
  const [sigText, setSigText] = useState('');
  const [name, setName] = useState('VexaOs Edge');
  const [notes, setNotes] = useState('');
  const [channel, setChannel] = useState('BETA');
  const [step, setStep] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const parsed = manifestText && sigText ? parseReleaseFiles(manifestText, sigText, file?.name ?? null) : null;
  const keyKnown = parsed && keys.some((k) => k.key_id === parsed.keyId && !k.revoked_at);
  const readInto = (set: (s: string) => void) => async (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) set(await f.text()); };

  return (
    <Dialog title="New release" onClose={onClose} wide>
      <ol className="mb-3 list-decimal space-y-1 pl-5 text-xs text-slate-600">
        <li>On your computer: <code>scripts/fleet/build-release.sh app</code>, then <code>scripts/fleet/sign-release.py sign …</code> (the private key never leaves your computer).</li>
        <li>Here: the artifact, its <code>.manifest.json</code> and its <code>.sig</code>. The server then checks the checksum and the signature.</li>
        <li>Someone with approval rights approves it. Then it can be deployed.</li>
      </ol>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        if (!file || !parsed || parsed.problems.length) return;
        setErr(null);
        try {
          setStep('Uploading the artifact to private storage…');
          const path = `releases/${crypto.randomUUID()}/${file.name}`;
          const up = await adminClient().storage.from('fleet-artifacts').upload(path, file, { contentType: 'application/gzip', upsert: false });
          if (up.error) throw new Error(`Upload failed: ${up.error.message}`);
          setStep('Registering…');
          const id = await act(() => fleetCall<string>('fleet_release_create', { p_name: name, p_notes: notes, p_channel: channel, p_artifact_path: path,
            p_manifest: parsed.manifest, p_signature: parsed.signature, p_key_id: parsed.keyId, p_release_date: null }));
          setStep('The server is checking the checksum and the signature…');
          const v = await verifyOnServer(id);
          if (!v.ok) throw new Error(`Registered, but the server check failed: ${v.error}. Fix it and verify again from the list.`);
          toast('Release registered and verified. It needs approval before deployment.');
          onDone();
        } catch (x) { setErr(x instanceof Error ? x.message : String(x)); setStep(null); }
      }}>
        <label className="block text-sm font-medium">Artifact (.tar.gz)<input type="file" accept=".gz,.tgz,application/gzip" required className="mt-1 block text-sm" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">Manifest (.manifest.json)<input type="file" accept=".json" className="mt-1 block text-sm" onChange={readInto(setManifestText)} />
            <textarea className={`${INPUT} mt-1 h-24 py-2 font-mono text-xs`} value={manifestText} onChange={(e) => setManifestText(e.target.value)} placeholder="or paste it" /></label>
          <label className="text-sm font-medium">Signature (.sig)<input type="file" accept=".sig,.json" className="mt-1 block text-sm" onChange={readInto(setSigText)} />
            <textarea className={`${INPUT} mt-1 h-24 py-2 font-mono text-xs`} value={sigText} onChange={(e) => setSigText(e.target.value)} placeholder="or paste it" /></label>
        </div>
        {parsed && (
          <div className={`rounded-xl p-3 text-xs ring-1 ${parsed.problems.length || !keyKnown ? 'bg-rose-50 text-rose-900 ring-rose-200' : 'bg-slate-50 ring-slate-200'}`}>
            {parsed.problems.length > 0 ? <ul className="list-disc pl-4">{parsed.problems.map((p) => <li key={p}>{p}</li>)}</ul> : (
              <p>{String(parsed.manifest.category)} {String(parsed.manifest.version)} for {String(parsed.manifest.hardwareFamily)} · signed with key <span className="font-mono">{parsed.keyId}</span>
                {!keyKnown && <b> — this key is not registered (or revoked): register its public key first.</b>}</p>
            )}
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium sm:col-span-2">Name<input required maxLength={120} className={`${INPUT} mt-1`} value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="text-sm font-medium">Channel<select className={`${INPUT} mt-1`} value={channel} onChange={(e) => setChannel(e.target.value)}><option>DEVELOPMENT</option><option>BETA</option><option>STABLE</option></select></label>
        </div>
        <label className="block text-sm font-medium">Release notes<textarea maxLength={10000} className={`${INPUT} mt-1 h-24 py-2`} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
        {step && <p role="status" className="flex items-center gap-2 text-sm text-slate-700"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{step}</p>}
        {err && <p role="alert" className="text-sm text-rose-600">{err}</p>}
        <div className="flex justify-end gap-2"><button type="button" className={BTN_QUIET} onClick={onClose}>Cancel</button>
          <button type="submit" className={BTN} disabled={!file || !parsed || parsed.problems.length > 0 || !keyKnown || !!step}>Upload, register and verify</button></div>
      </form>
    </Dialog>
  );
}
