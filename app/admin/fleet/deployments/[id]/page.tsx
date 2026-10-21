import { DeploymentDetail } from '@/components/fleet-admin/Deployments';

export default function Page({ params }: { params: { id: string } }) { return <DeploymentDetail id={params.id} />; }
