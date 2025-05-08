async function fetchLines() {
    const username = 'admin';
    const password = 'password123';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch('http://localhost:8000/lines', {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch lines');
    }

    const data = await res.json();
    return data.Lines;
}

export default async function LinesPage(){
    const lines = await fetchLines();

    return (
        <div>
            <h1>Metro Lines</h1>
            <ul>
                {lines.map((line: any) => (
                    <li key={line.LineCode}>
                        <a href={`/stations/${line.LineCode}`}>{line.DisplayName}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

