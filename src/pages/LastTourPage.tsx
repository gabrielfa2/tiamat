import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Trophy, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlayerStats {
  name: string;
  character: string;
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  damage: number;
  accuracy: number;
}

interface Match {
  id: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss';
  score: string;
  game: string;
  tournament: string;
  players: PlayerStats[];
}

const LastTourPage = () => {
  const navigate = useNavigate();
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const matches: Match[] = [
    {
      id: '1',
      date: '2024-11-18',
      opponent: 'VITALITY',
      result: 'win',
      score: '16 - 8',
      game: 'CS2',
      tournament: 'IEM Cologne 2024',
      players: [
        { name: 'DRAGONFIRE', character: 'AWP', kills: 28, deaths: 5, assists: 4, kd: 5.6, damage: 3240, accuracy: 68 },
        { name: 'VENOM', character: 'Rifle', kills: 24, deaths: 8, assists: 6, kd: 3.0, damage: 2890, accuracy: 62 },
        { name: 'SHADOW', character: 'Rifle', kills: 18, deaths: 6, assists: 12, kd: 3.0, damage: 2100, accuracy: 58 },
        { name: 'STORM', character: 'Support', kills: 12, deaths: 8, assists: 15, kd: 1.5, damage: 1850, accuracy: 52 },
        { name: 'CHAOS', character: 'Rifle', kills: 20, deaths: 7, assists: 8, kd: 2.86, damage: 2450, accuracy: 61 },
      ],
    },
    {
      id: '2',
      date: '2024-11-16',
      opponent: 'FAZE CLAN',
      result: 'win',
      score: '2 - 0',
      game: 'VALORANT',
      tournament: 'VCT Champions',
      players: [
        { name: 'DUELISTA', character: 'Reyna', kills: 32, deaths: 8, assists: 6, kd: 4.0, damage: 3800, accuracy: 72 },
        { name: 'INICIADOR', character: 'Kayo', kills: 18, deaths: 9, assists: 14, kd: 2.0, damage: 2100, accuracy: 64 },
        { name: 'SENTINELA', character: 'Killjoy', kills: 14, deaths: 12, assists: 10, kd: 1.17, damage: 1650, accuracy: 58 },
        { name: 'CONTROLADOR', character: 'Omen', kills: 12, deaths: 10, assists: 18, kd: 1.2, damage: 1420, accuracy: 55 },
        { name: 'CONTROLADOR', character: 'Jett', kills: 28, deaths: 7, assists: 8, kd: 4.0, damage: 3200, accuracy: 70 },
      ],
    },
    {
      id: '3',
      date: '2024-11-14',
      opponent: 'TEAM LIQUID',
      result: 'win',
      score: '13 - 11',
      game: 'CS2',
      tournament: 'BLAST Premier 2024',
      players: [
        { name: 'DRAGONFIRE', character: 'AWP', kills: 26, deaths: 7, assists: 5, kd: 3.71, damage: 3050, accuracy: 66 },
        { name: 'VENOM', character: 'Rifle', kills: 22, deaths: 9, assists: 7, kd: 2.44, damage: 2700, accuracy: 60 },
        { name: 'SHADOW', character: 'Rifle', kills: 16, deaths: 8, assists: 10, kd: 2.0, damage: 1950, accuracy: 56 },
        { name: 'STORM', character: 'Support', kills: 11, deaths: 9, assists: 13, kd: 1.22, damage: 1720, accuracy: 50 },
        { name: 'CHAOS', character: 'Rifle', kills: 19, deaths: 6, assists: 6, kd: 3.17, damage: 2280, accuracy: 59 },
      ],
    },
    {
      id: '4',
      date: '2024-11-12',
      opponent: 'NAVI',
      result: 'loss',
      score: '14 - 16',
      game: 'CS2',
      tournament: 'ESL Pro League',
      players: [
        { name: 'DRAGONFIRE', character: 'AWP', kills: 24, deaths: 9, assists: 4, kd: 2.67, damage: 2890, accuracy: 64 },
        { name: 'VENOM', character: 'Rifle', kills: 20, deaths: 10, assists: 5, kd: 2.0, damage: 2400, accuracy: 58 },
        { name: 'SHADOW', character: 'Rifle', kills: 15, deaths: 11, assists: 8, kd: 1.36, damage: 1800, accuracy: 54 },
        { name: 'STORM', character: 'Support', kills: 10, deaths: 10, assists: 11, kd: 1.0, damage: 1550, accuracy: 48 },
        { name: 'CHAOS', character: 'Rifle', kills: 18, deaths: 9, assists: 5, kd: 2.0, damage: 2150, accuracy: 57 },
      ],
    },
    {
      id: '5',
      date: '2024-11-10',
      opponent: 'G2 ESPORTS',
      result: 'win',
      score: '19 - 15',
      game: 'CS2',
      tournament: 'PGL Major 2024',
      players: [
        { name: 'DRAGONFIRE', character: 'AWP', kills: 30, deaths: 6, assists: 3, kd: 5.0, damage: 3420, accuracy: 70 },
        { name: 'VENOM', character: 'Rifle', kills: 25, deaths: 8, assists: 8, kd: 3.13, damage: 2980, accuracy: 63 },
        { name: 'SHADOW', character: 'Rifle', kills: 19, deaths: 7, assists: 11, kd: 2.71, damage: 2200, accuracy: 59 },
        { name: 'STORM', character: 'Support', kills: 13, deaths: 7, assists: 14, kd: 1.86, damage: 1880, accuracy: 51 },
        { name: 'CHAOS', character: 'Rifle', kills: 22, deaths: 5, assists: 7, kd: 4.4, damage: 2600, accuracy: 62 },
      ],
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getResultColor = (result: 'win' | 'loss') => {
    return result === 'win' ? 'bg-green-600/20 border-green-600/50' : 'bg-red-600/20 border-red-600/50';
  };

  const getResultTextColor = (result: 'win' | 'loss') => {
    return result === 'win' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="pt-32 pb-16 bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            MATCH HISTORY
          </h1>
          <p className="text-gray-300 text-lg">Recent tournament matches and detailed player statistics</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">MATCHES PLAYED</div>
            <div className="text-3xl font-bold text-white">5</div>
            <div className="text-green-400 text-xs mt-2">Last 2 weeks</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">WIN RATE</div>
            <div className="text-3xl font-bold text-white">80%</div>
            <div className="text-green-400 text-xs mt-2">4 Wins - 1 Loss</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">AVG KILLS/MATCH</div>
            <div className="text-3xl font-bold text-white">21.8</div>
            <div className="text-green-400 text-xs mt-2">Per player average</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">BEST PLAYER</div>
            <div className="text-3xl font-bold text-white">DRAGONFIRE</div>
            <div className="text-green-400 text-xs mt-2">4.63 avg K/D</div>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map(match => (
            <div key={match.id} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              {/* Match Summary */}
              <div
                onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                className={`p-6 cursor-pointer hover:bg-slate-700/50 transition-colors ${getResultColor(match.result)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">{formatDate(match.date)}</div>
                      <div className="text-gray-400 text-xs">{match.tournament}</div>
                    </div>
                    <div className="h-12 w-px bg-slate-600"></div>
                    <div className="text-white font-bold">TIAMAT</div>
                    <div className={`text-2xl font-bold ${getResultTextColor(match.result)}`}>
                      {match.score}
                    </div>
                    <div className="text-white font-bold">{match.opponent}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded font-bold text-sm ${
                      match.result === 'win'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {match.result === 'win' ? 'WIN' : 'LOSS'}
                    </span>
                    <span className="text-gray-400 text-sm">{match.game}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedMatch === match.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Player Stats Table */}
              {expandedMatch === match.id && (
                <div className="border-t border-slate-700 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-700/50">
                        <th className="px-6 py-4 text-left text-gray-400 font-bold text-xs">PLAYER</th>
                        <th className="px-6 py-4 text-left text-gray-400 font-bold text-xs">CHARACTER</th>
                        <th className="px-6 py-4 text-center text-gray-400 font-bold text-xs">KILLS</th>
                        <th className="px-6 py-4 text-center text-gray-400 font-bold text-xs">DEATHS</th>
                        <th className="px-6 py-4 text-center text-gray-400 font-bold text-xs">ASSISTS</th>
                        <th className="px-6 py-4 text-center text-gray-400 font-bold text-xs">K/D</th>
                        <th className="px-6 py-4 text-center text-gray-400 font-bold text-xs">DAMAGE</th>
                        <th className="px-6 py-4 text-center text-gray-400 font-bold text-xs">ACC%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.players.map((player, idx) => {
                        const isBest = player.kd === Math.max(...match.players.map(p => p.kd));
                        return (
                          <tr
                            key={idx}
                            className={`border-t border-slate-700 ${
                              idx % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
                            } hover:bg-slate-700/50 transition-colors ${
                              isBest ? 'bg-purple-600/10' : ''
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {isBest && <Trophy className="h-4 w-4 text-yellow-400" />}
                                <span className="text-white font-bold">{player.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-300">{player.character}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-green-400 font-bold">{player.kills}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-red-400 font-bold">{player.deaths}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-blue-400 font-bold">{player.assists}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`font-bold ${player.kd > 2 ? 'text-green-400' : 'text-gray-300'}`}>
                                {player.kd.toFixed(2)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-gray-300">{player.damage}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`font-bold ${player.accuracy > 60 ? 'text-green-400' : 'text-gray-300'}`}>
                                {player.accuracy}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 rounded-lg border border-purple-600/30">
          <h3 className="text-white font-bold text-lg mb-4">Performance Metrics</h3>
          <p className="text-gray-300 mb-4">
            Our team maintains exceptional performance across all tournaments. Statistics include kills, deaths, assists,
            K/D ratio, damage dealt, and accuracy percentage. Higher accuracy and K/D ratios indicate superior individual
            skill, while team coordination and strategic execution lead to victory.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <div className="text-green-400 font-bold text-sm mb-1">BEST STAT</div>
              <div className="text-white">DRAGONFIRE AWPing: 5.6 K/D</div>
            </div>
            <div>
              <div className="text-blue-400 font-bold text-sm mb-1">TEAM STRENGTH</div>
              <div className="text-white">Balanced roster with specialist players</div>
            </div>
            <div>
              <div className="text-purple-400 font-bold text-sm mb-1">CONSISTENCY</div>
              <div className="text-white">80% win rate in recent tournaments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastTourPage;
