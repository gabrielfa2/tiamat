import React, { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Team {
  id: string;
  rank: number;
  name: string;
  logo: string;
  region: string;
  points: number;
  wins: number;
  losses: number;
  winRate: number;
}

const RankingPage = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState('all');

  const teams: Team[] = [
    {
      id: '1',
      rank: 1,
      name: 'TIAMAT',
      logo: `${import.meta.env.BASE_URL}logo.png`,
      region: 'LATAM',
      points: 1500,
      wins: 45,
      losses: 8,
      winRate: 84.9,
    },
    {
      id: '2',
      rank: 2,
      name: 'VITALITY',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'EU',
      points: 1420,
      wins: 42,
      losses: 10,
      winRate: 80.8,
    },
    {
      id: '3',
      rank: 3,
      name: 'FAZE CLAN',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'EU',
      points: 1380,
      wins: 41,
      losses: 12,
      winRate: 77.4,
    },
    {
      id: '4',
      rank: 4,
      name: 'TEAM LIQUID',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'NA',
      points: 1350,
      wins: 39,
      losses: 13,
      winRate: 75.0,
    },
    {
      id: '5',
      rank: 5,
      name: 'G2 ESPORTS',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'EU',
      points: 1320,
      wins: 38,
      losses: 14,
      winRate: 73.1,
    },
    {
      id: '6',
      rank: 6,
      name: 'NAVI',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'CIS',
      points: 1280,
      wins: 36,
      losses: 16,
      winRate: 69.2,
    },
    {
      id: '7',
      rank: 7,
      name: 'CLOUD9',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'NA',
      points: 1240,
      wins: 34,
      losses: 18,
      winRate: 65.4,
    },
    {
      id: '8',
      rank: 8,
      name: 'FNATIC',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'EU',
      points: 1200,
      wins: 32,
      losses: 20,
      winRate: 61.5,
    },
    {
      id: '9',
      rank: 9,
      name: 'EVIL GENIUSES',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'NA',
      points: 1150,
      wins: 30,
      losses: 22,
      winRate: 57.7,
    },
    {
      id: '10',
      rank: 10,
      name: 'FUNPLUS PHOENIX',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200',
      region: 'ASIA',
      points: 1100,
      wins: 28,
      losses: 24,
      winRate: 53.8,
    },
  ];

  const regionColors: Record<string, string> = {
    'LATAM': 'bg-yellow-600',
    'EU': 'bg-blue-600',
    'NA': 'bg-red-600',
    'CIS': 'bg-purple-600',
    'ASIA': 'bg-green-600',
  };

  const getRegionBgColor = (region: string) => regionColors[region] || 'bg-gray-600';
  const getRankBgColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500';
    if (rank === 2) return 'bg-gray-400';
    if (rank === 3) return 'bg-orange-600';
    return 'bg-slate-700';
  };

  return (
    <div className="pt-32 pb-16 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
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
            ESPORTS RANKING
          </h1>
          <p className="text-gray-300 text-lg">Top 10 teams competing at the highest level</p>
        </div>

        {/* Game Filter */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setSelectedGame('all')}
            className={`px-6 py-2 rounded font-bold transition-colors ${selectedGame === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
          >
            ALL GAMES
          </button>
          <button
            onClick={() => setSelectedGame('cs2')}
            className={`px-6 py-2 rounded font-bold transition-colors ${selectedGame === 'cs2'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
          >
            CS2
          </button>
          <button
            onClick={() => setSelectedGame('valorant')}
            className={`px-6 py-2 rounded font-bold transition-colors ${selectedGame === 'valorant'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
          >
            VALORANT
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">TOTAL TEAMS</div>
            <div className="text-3xl font-bold text-white">10</div>
            <div className="text-purple-400 text-xs mt-2">Ranked teams</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">TOP TEAM POINTS</div>
            <div className="text-3xl font-bold text-white">1500</div>
            <div className="text-purple-400 text-xs mt-2">TIAMAT Leadership</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-gray-400 text-sm mb-2">BEST WIN RATE</div>
            <div className="text-3xl font-bold text-white">84.9%</div>
            <div className="text-purple-400 text-xs mt-2">TIAMAT Performance</div>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700 border-b border-slate-600">
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">RANK</th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">TEAM</th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">REGION</th>
                  <th className="px-6 py-4 text-center text-white font-bold text-sm">POINTS</th>
                  <th className="px-6 py-4 text-center text-white font-bold text-sm">W/L</th>
                  <th className="px-6 py-4 text-center text-white font-bold text-sm">WIN RATE</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={team.id}
                    className={`border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className={`${getRankBgColor(team.rank)} w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white`}>
                        {team.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="text-white font-bold">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getRegionBgColor(team.region)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {team.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-bold text-lg">{team.points}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-300">
                        {team.wins}W - {team.losses}L
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-green-400 font-bold">{team.winRate}%</span>
                        {team.rank === 1 && (
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 rounded-lg border border-purple-600/30">
          <h3 className="text-white font-bold text-lg mb-4">About Rankings</h3>
          <p className="text-gray-300">
            These rankings are updated weekly based on tournament performances, win rates, and competitive achievements.
            Points are earned through tournament victories, successful streaks, and overall team performance. TIAMAT leads the
            global ranking with a dominant 84.9% win rate across all competitive games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
