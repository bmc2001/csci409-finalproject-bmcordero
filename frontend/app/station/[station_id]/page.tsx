import { notFound } from 'next/navigation';

async function fetchStationInfo(station_id: string) {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/station/${station_id}`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
}

export default async function StationInfoPage({ params }: { params: {station_id: string} }){
    const info = await fetchStationInfo(params.station_id);
    if (!info) return notFound();

    return (
        <div>
            <h1>{info.Name} Station</h1>

            <p><strong>Code:</strong> {info.Code}</p>
            <p><strong>Located at:</strong>
                {info.Address?.Street}, {info.Address?.City},
                {info.Address?.State} {info.Address?.Zip}</p>
            <p><strong>Coordinates:</strong> Lat {info.Lat}, Lon {info.Lon}</p>

            <p><strong>Connected Lines:</strong>
                {[info.LineCode1, info.LineCode2, info.LineCode3, info.LineCode4]
                    .filter(Boolean)
                    .join(', ')}
            </p>

            {info.StationTogether1 && (
                <p><strong>Linked with station:</strong> {info.StationTogether1}</p>
            )}
        </div>
    );
}
