import { notFound } from 'next/navigation';

async function fetchStations(line: string) {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/stations/${line}`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.Stations;
}

export default async function StationsPage({ params }: { params: {line: string} }) {
    const stations = await fetchStations(params.line);
    if (!stations) return notFound();

    return (
        <div>
            <h1>Stations on Line: {params.line}</h1>
            <ul>
                {stations.map((station: any) =>(
                    <li key={station.Code}>
                        <a href={`/station/${station.Code}`}>{station.Name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

