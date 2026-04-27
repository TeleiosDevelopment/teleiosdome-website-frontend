"use client";
import React from "react";


const sampleDrivers = [
  { pos: 1, driver: "Leonard Fadi", pts: 829 },
  { pos: 2, driver: "Essa Al Hammadi", pts: 610 },
  { pos: 3, driver: "Arthur De Doncker", pts: 571 },
];

const canadianData = [
  { pos: 1, driver: "Leonard F", team: "Ferrari", bestLap: "1:22.740", laps: 12, gap: "16:40:950", pts: "63+1" },
  { pos: 2, driver: "Nick D", team: "Aston Martin", bestLap: "1:23.188", laps: 12, gap: "+6.610", pts: "54" },
  { pos: 3, driver: "Lucas T.L", team: "Williams", bestLap: "1:24.208", laps: 12, gap: "+17.745", pts: "47" },

];

const finalBData = [
  { pos: 1, driver: "Emile N", team: "Ferrari", bestLap: "1:24.141", laps: 12, gap: "16:57.992", pts: "21+1" },
  { pos: 2, driver: "Ivan P", team: "Kick Sauber", bestLap: "1:27.197", laps: 12, gap: "+40.384", pts: "17" },
  { pos: 3, driver: "Hamza Z", team: "Red Bull Racing", bestLap: "1.27.511", laps: 12, gap: "+45.967", pts: "14" },

];

const ResultsSection: React.FC = () => {
    return (
        <div id="results-preview" className="py-16 text-center text-white bg-transparent">
            <div className="container mx-auto px-4">
            <div className="mb-12 mt-0">
                <div className="flex justify-end mb-2">
                <span className="text-sm text-white uppercase tracking-wider">
Championship Standings &amp; Past Race Results
                </span>
                </div>
                <div className="border-t border-gray-500 w-full mb-1" />
                <h2 className="text-5xl font-bold text-white text-center mt-12">
                     Standings &amp;  Race Results                </h2>
            </div>

            <p className="text-lg font-jura mb-8 max-w-2xl mx-auto text-center">
                Follow the championship battle! Current standings and detailed results from past races are updated regularly.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-4">

                {/* Standings Column */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Championship Standings
                    </h2>
                    <div className="bg-purple-600 rounded-2xl p-4 overflow-auto max-w-sm mx-auto">
                        <table className="w-full text-white border-collapse">
                            <thead>
                            <tr>
                                <th className="px-3 py-2 ">POS</th>
                                <th className="px-3 py-2 ">Driver</th>
                                <th className="px-3 py-2">Pts</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sampleDrivers.map((row) => (
                                <tr key={row.pos}>
                                    <td className="px-2 py-4 ">{row.pos}</td>
                                    <td className="px-2 py-4 ">{row.driver}</td>
                                    <td className="px-2 py-4 ">{row.pts}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Race Results Column */}
                <div>
                    <h2> Qatar VRS </h2>
                    <h2 className="text-3xl font-bold text-white mb-4">Final A Results</h2>
                    <div className="bg-purple-600 rounded-2xl p-4 overflow-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr>
                            <th className="px-3 py-2">POS</th>
                            <th className="px-3 py-2">Driver</th>
                            <th className="px-3 py-2">TEAM</th>
                            <th className="px-3 py-2">BEST LAP</th>
                            <th className="px-3 py-2">LAPS</th>
                            <th className="px-3 py-2">GAP</th>
                            <th className="px-3 py-2">PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {canadianData.map((r) => (
                            <tr key={r.pos}>
                              <td className="px-2 py-1">{r.pos}</td>
                              <td className="px-2 py-1">{r.driver}</td>
                              <td className="px-2 py-1">{r.team}</td>
                              <td className="px-2 py-1">{r.bestLap}</td>
                              <td className="px-2 py-1">{r.laps}</td>
                              <td className="px-2 py-1">{r.gap}</td>
                              <td className="px-2 py-1">{r.pts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <h2 className="text-3xl font-bold text-white mt-12 mb-4">Final B Results</h2>
                    <div className="bg-purple-600 rounded-2xl p-4 overflow-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr>
                            <th className="px-3 py-2">POS</th>
                            <th className="px-3 py-2">Driver</th>
                            <th className="px-3 py-2">TEAM</th>
                            <th className="px-3 py-2">BEST LAP</th>
                            <th className="px-3 py-2">LAPS</th>
                            <th className="px-3 py-2">GAP</th>
                            <th className="px-3 py-2">PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {finalBData.map((r) => (
                            <tr key={r.pos}>
                              <td className="px-2 py-1">{r.pos}</td>
                              <td className="px-2 py-1">{r.driver}</td>
                              <td className="px-2 py-1">{r.team}</td>
                              <td className="px-2 py-1">{r.bestLap}</td>
                              <td className="px-2 py-1">{r.laps}</td>
                              <td className="px-2 py-1">{r.gap}</td>
                              <td className="px-2 py-1">{r.pts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ResultsSection;