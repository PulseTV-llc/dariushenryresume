import GatewayDetail from '@/components/fleet-admin/GatewayDetail';

export default function Page({ params }: { params: { id: string } }) { return <GatewayDetail id={params.id} />; }
