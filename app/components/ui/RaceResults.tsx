"use client";

import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';

type ResultRow = {
    pos: number;
    driver: string;
    team: string;
    bestLap: string; // e.g. "1:13.317"
    laps: number;
    gap: string;     // e.g. "+1.976" or "–"
    pts: string;     // e.g. "79", "63+1"
};

type SessionData = {
    name: string;                     // e.g. "Final A"
    results: ResultRow[];             // array of rows for the table
    fastestLap: { driver: string; time: string } | null;
    penalties: { driver: string; reason: string; penalty: string }[];
};

// ───────────────────────────────────────────────
// 1) DYNAMIC RACES AND SESSIONS (fetched from /dummydata/results/index.json)
// ───────────────────────────────────────────────

// ───────────────────────────────────────────────
// 2) FETCH AND PARSE CSV DATA
// ───────────────────────────────────────────────
async function fetchCSV(race: string, session: string): Promise<SessionData> {
    const formattedRace = race.toLowerCase().replace(/\s/g, '');
    const formattedSession = session.toLowerCase().replace(/\s/g, '');
    const url = `/dummydata/results/${formattedRace}/${formattedSession}.csv`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch CSV at ${url}`);
    }
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    const data = parsed.data as Record<string, string>[];

    const results: ResultRow[] = [];
    const penalties: { driver: string; reason: string; penalty: string }[] = [];
    let fastestLap: { driver: string; time: string } | null = null;

    data.forEach(row => {
        const posRaw = row.pos?.trim();
        const driverRaw = row.driver?.trim();
        if (posRaw && driverRaw) {
            // This is a result row
            const pos = Number(posRaw);
            const laps = Number(row.laps);
            results.push({
                pos,
                driver: driverRaw,
                team: row.team?.trim() || '',
                bestLap: row.bestLap?.trim() || '',
                laps,
                gap: row.gap?.trim() || '',
                pts: row.pts?.trim() || '',
            });
            // Check fastest lap from this row if present
            if (row.fastestLap?.trim() === 'yes' || row.fastestLap?.trim() === 'true') {
                fastestLap = { driver: driverRaw, time: row.bestLap?.trim() || '' };
            }
        } else if (!posRaw && !driverRaw && row.penaltyValue) {
            // Penalty row
            penalties.push({
                driver: row.penaltyDriver?.trim() || '',
                reason: row.penaltyReason?.trim() || '',
                penalty: row.penaltyValue?.trim() || '',
            });
        } else if (!posRaw && !driverRaw && row.driver && row.time) {
            // Possibly fastest lap row (alternative format)
            fastestLap = { driver: row.driver.trim(), time: row.time.trim() };
        }
    });

    return {
        name: session,
        results,
        fastestLap,
        penalties,
    };
}

// ───────────────────────────────────────────────
// 3) ACTUAL COMPONENT
// ───────────────────────────────────────────────
const RaceResults: React.FC = () => {
    // All races/sessions, dynamically loaded
    const [allRaces, setAllRaces] = useState<Record<string, string[]>>({});
    const [selectedRace, setSelectedRace] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<string>('');
    const [data, setData] = useState<SessionData>({
        name: '',
        results: [],
        fastestLap: null,
        penalties: [],
    });
    const [error, setError] = useState<string | null>(null);
    const raceKeys = Object.keys(allRaces);
    const sessionKeys = selectedRace ? (allRaces[selectedRace] || []) : [];

    // Fetch all races/sessions from index.json on mount
    useEffect(() => {
        let cancelled = false;
        fetch("/dummydata/results/index.json")
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch index.json`);
                return res.json();
            })
            .then((json) => {
                if (!cancelled) {
                    setAllRaces(json);
                    // Set default race and session
                    const races = Object.keys(json);
                    if (races.length > 0) {
                        setSelectedRace(races[0]);
                        const sessions = json[races[0]];
                        if (sessions && sessions.length > 0) {
                            setSelectedSession(sessions[0]);
                        }
                    }
                }
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Update session when race changes
    useEffect(() => {
        if (selectedRace && allRaces[selectedRace]) {
            setSelectedSession(allRaces[selectedRace][0]);
        }
    }, [selectedRace, allRaces]);

    // Fetch CSV data when race or session changes
    useEffect(() => {
        if (!selectedRace || !selectedSession) return;
        let cancelled = false;
        setError(null);
        fetchCSV(selectedRace, selectedSession)
            .then(sessionData => {
                if (!cancelled) {
                    setData(sessionData);
                }
            })
            .catch(err => {
                if (!cancelled) {
                    setError(err.message);
                    setData({
                        name: selectedSession,
                        results: [],
                        fastestLap: null,
                        penalties: [],
                    });
                }
            });
        return () => {
            cancelled = true;
        };
    }, [selectedRace, selectedSession]);

    return (
        <div className="max-w-5xl mx-auto p-8 mt-20">
            <div className="mb-6">
                <h2
                    className="text-4xl md:text-5xl font-bold uppercase text-white px-6 py-4 rounded-t-lg shadow-md"
                    style={{ background: "linear-gradient(90deg, #4B0082, #8A2BE2)" }}
                >
                2025    {selectedRace} VGP – {data.name}
                </h2>
            </div>
            {/* ────────── RACE AND SESSION SELECTOR ────────── */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="race-select" className="text-white text-base font-medium mb-1 block">Select Race:</label>
                    <select
                        id="race-select"
                        value={selectedRace}
                        onChange={(e) => setSelectedRace(e.target.value)}
                        className="w-full bg-[#2C1864] border border-[#4B0082] rounded text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                        disabled={raceKeys.length === 0}
                    >
                        {raceKeys.map((race) => (
                            <option key={race} value={race}>{race}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="session-select" className="text-white text-base font-medium mb-1 block">Select Session:</label>
                    <select
                        id="session-select"
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                        className="w-full bg-[#2C1864] border border-[#4B0082] rounded text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                        disabled={sessionKeys.length === 0}
                    >
                        {sessionKeys.map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-600 text-white rounded">
                    Error loading data: {error}
                </div>
            )}

            {/* ────────── TABLE ────────── */}
            <div className="mt-8 relative overflow-x-auto scrollbar-none rounded-b-lg shadow-lg" style={{ background: "#2C1864C2" }}>
                <div className="p-4">
                    <table className="min-w-full table-fixed text-white">
                        <thead>
                        <tr style={{ background: "linear-gradient(90deg, #2C1864, #3A246B)" }}>
                            <th className="sticky left-0 z-10 top-0 uppercase px-3 py-2 w-12 min-w-[3rem] text-[10px] bg-[#2C1864] text-[#EEEEEE]">POS</th>
                            <th className="sticky left-12 z-10 top-0 uppercase px-3 py-2 w-40 min-w-[10rem] text-[10px] bg-[#2C1864] text-[#EEEEEE]">DRIVER</th>
                            <th className="sticky left-52 z-10 top-0 uppercase px-3 py-2 w-32 min-w-[8rem] text-[10px] bg-[#2C1864] text-[#EEEEEE] hidden md:table-cell">TEAM</th>
                            <th className="uppercase px-3 py-2 w-24 min-w-[6rem] text-[10px] bg-[#2C1864] text-[#EEEEEE]">BEST LAP</th>
                            <th className="uppercase px-3 py-2 w-16 min-w-[4rem] text-[10px] bg-[#2C1864] text-[#EEEEEE] hidden md:table-cell">LAPS</th>
                            <th className="uppercase px-3 py-2 w-24 min-w-[6rem] text-[10px] bg-[#2C1864] text-[#EEEEEE] hidden md:table-cell">GAP</th>
                            <th className="sticky right-0 z-10 top-0 uppercase px-3 py-2 w-12 min-w-[3rem] text-[10px] bg-[#2C1864] text-[#EEEEEE]">PTS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.results.map((row) => {
                            const isFastest = data.fastestLap?.driver === row.driver;
                            return (
                                <tr
                                    key={row.pos}
                                    className="hover:bg-[#4B0082]"
                                    style={{ backgroundColor: row.pos % 2 === 0 ? "#3A246B" : "#2C1864" }}
                                >
                                    <td
                                        className="sticky left-0 z-10 text-white px-2 py-1 w-12 min-w-[3rem] text-[11px] bg-[#2C1864]"
                                    >
                                        {row.pos}
                                    </td>
                                    <td
                                        className="sticky left-12 z-10 text-white px-2 py-1 w-40 min-w-[10rem] text-[11px] bg-[#2C1864]"
                                    >
                                        {row.driver}
                                    </td>
                                    <td
                                        className="sticky left-52 z-10 text-white px-2 py-1 w-32 min-w-[8rem] text-[11px] bg-[#2C1864] hidden md:table-cell"
                                    >
                                        {row.team}
                                    </td>
                                    <td
                                        className={`px-2 py-1 w-24 min-w-[6rem] text-[11px] bg-[#2C1864] ${isFastest ? "font-bold text-transparent bg-clip-text" : "text-white"}`}
                                        style={
                                            isFastest
                                                ? {
                                                    backgroundImage: "linear-gradient(90deg, #A020F0, #551A8B)"
                                                }
                                                : undefined
                                        }
                                    >
                                        {row.bestLap}
                                    </td>
                                    <td
                                        className="px-2 py-1 w-16 min-w-[4rem] text-[11px] bg-[#2C1864] text-white hidden md:table-cell"
                                    >
                                        {row.laps}
                                    </td>
                                    <td
                                        className="px-2 py-1 w-24 min-w-[6rem] text-[11px] bg-[#2C1864] text-white hidden md:table-cell"
                                    >
                                        {row.gap}
                                    </td>
                                    <td
                                        className="sticky right-0 z-10 text-white px-2 py-1 w-12 min-w-[3rem] text-[11px] bg-[#2C1864]"
                                    >
                                        {row.pts}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ────────── FASTEST LAP ────────── */}
            {data.fastestLap && (
                <div className="mt-6 p-3 rounded" style={{ background: "#3A246B", color: "#FFFFFF", border: "1px solid #4B0082" }}>
                    <span className="font-semibold text-base">FL: </span>
                    {data.fastestLap.driver} – <span className="text-purple-400">{data.fastestLap.time}</span>
                </div>
            )}

            {/* ────────── PENALTIES APPLIED ────────── */}
            {data.penalties.length > 0 && (
                <div
                    className="mt-6 p-4 rounded-b-lg border-t"
                    style={{ background: "#c60f0f", borderColor: "#d61010", color: "#FFFFFF" }}
                >
                    <div className="font-bold uppercase mb-2 text-base">Penalties Applied</div>
                    {data.penalties.map((pen, idx) => (
                        <div key={idx} className="text-[11px]">
                            <span className="font-semibold">{pen.driver}</span> {pen.penalty}: <em>({pen.reason}) </em>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RaceResults;