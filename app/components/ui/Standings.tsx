import React from 'react';

type Driver = {
  position: number;
  name: string;
  raceResults: (number | '-')[]; // Use '-' for no result
  points: number;
};

type StandingsProps = {
  drivers: Driver[];
  nextRace?: string;
};

const Standings: React.FC<StandingsProps> = ({ drivers, nextRace }) => {
  const races = [
    'BHR', 'SAU', 'AUS', 'AZE', 'MIA', 'IMOLA', 'MON', 'ESP',
    'CAN', 'AUT', 'GBR', 'HUN', 'BEL', 'NED', 'ITA', 'SGP',
    'JPN', 'QAT', 'USA', 'MEX', 'BRA', 'LAS', 'ABU'
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 pt-32">
          <h1 className="text-4xl font-bold uppercase tracking-widest bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
           2025 Teleios Virtual Racing Series Leaderboard
          </h1>
        </div>

        {/* Table Container: allows horizontal scrolling */}
        <div className="relative overflow-x-auto bg-[#2C1864]  rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">          <table className="min-w-max table-fixed border-separate border-spacing-0">
            <thead>
              <tr>
                { /* “Pos” column (sticky) */ }
                <th className="sticky top-0 left-0 z-10 bg-[#2C1864]  px-2 py-1 text-center w-12 text-sm ">
                  Pos
                </th>

                { /* “Driver” column (sticky) */ }
                <th className="sticky top-0 left-12 z-10 bg-[#2C1864] px-2 py-1 text-left w-40 text-sm ">
                  Driver
                </th>

                { /* Race columns (scrollable) */ }
                {races.map((race, idx) => (
                  <th
                    key={idx}
                    className="sticky top-0 px-2 py-2 text-center bg-[#2C1864C2] whitespace-nowrap w-16 sm:w-20 text-sm"
                  >
                    {race}
                  </th>
                ))}

                { /* “Points” column (sticky on right) */ }
                <th className="sticky top-0 right-0 z-10 bg-red-700 bg-opacity-70 px-2 py-1 text-center w-12 text-sm ">
                  Points
                </th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver, idx) => {
                const paddedResults = [
                  ...driver.raceResults,
                  ...Array(Math.max(0, races.length - driver.raceResults.length)).fill(' ')
                ];
                return (
                  <tr
                    key={driver.name}
                    className={idx % 2 === 0 ? 'bg-purple-800' : 'bg-purple-800 bg-opacity-20'}
                  >
                    { /* Pos (sticky) */ }
                    <td className="sticky left-0 bg-purple-800 px-2 py-1 text-center font-bold w-12 text-sm ">
                      {driver.position}
                    </td>

                    { /* Name (sticky) */ }
                    <td className="sticky left-12 bg-purple-700 px-2 py-1 text-left capitalize whitespace-nowrap overflow-hidden overflow-ellipsis w-40 text-sm">
                      {driver.name}
                    </td>

                    { /* Race results (scrollable) */ }
                    {paddedResults.map((res, i) => (
                      <td key={i} className="px-2 py-2 text-center font-semibold whitespace-nowrap w-16 sm:w-20 text-sm border-r border-[#2C1864] border-opacity-10">
                        {res}
                      </td>
                    ))}

                    { /* Points (sticky right) */ }
                    <td className="sticky right-0 z-10 bg-red-700 bg-opacity-60 px-2 py-1 text-center font-bold w-12 text-sm ">
                      {driver.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        { /* Next Race Info */ }
        {nextRace && (
          <div className="mt-6 text-center bg-purple-800 rounded-lg p-4 shadow-md">
            <p className="text-lg opacity-80 mb-2">Next Race:</p>
            <h2 className="text-2xl font-bold uppercase bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              {nextRace}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Standings;