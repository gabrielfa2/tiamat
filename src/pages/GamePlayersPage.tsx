import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Target, Zap, Award } from 'lucide-react';

const GamePlayersPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const gameData = {
    'cs2': {
      name: 'COUNTER STRIKE 2',
      logo: '/cs2.png',
      description: 'Team Tiamat dominates Counter-Strike 2 with victories at major tournaments. Precision, cohesion and a thirst for victory propel us to the top of FPS esports.',
      players: [
        {
          id: 1,
          name: 'DRAGONFIRE',
          realName: 'Marcus Silva',
          role: 'AWPer',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.45', rating: '1.32', headshot: '68%' },
          achievements: ['IEM Katowice 2024', 'BLAST Premier 2024']
        },
        {
          id: 2,
          name: 'VENOM',
          realName: 'João Santos',
          role: 'Entry Fragger',
          image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.28', rating: '1.18', headshot: '72%' },
          achievements: ['ESL Pro League S18', 'PGL Major 2024']
        },
        {
          id: 3,
          name: 'SHADOW',
          realName: 'Pedro Costa',
          role: 'IGL',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.15', rating: '1.25', headshot: '65%' },
          achievements: ['BLAST Premier 2024', 'IEM Cologne 2024']
        },
        {
          id: 4,
          name: 'STORM',
          realName: 'Lucas Oliveira',
          role: 'Support',
          image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.08', rating: '1.12', headshot: '58%' },
          achievements: ['ESL One 2024', 'BLAST Premier 2024']
        },
        {
          id: 5,
          name: 'CHAOS',
          realName: 'Rafael Lima',
          role: 'Rifler',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.22', rating: '1.19', headshot: '63%' },
          achievements: ['IEM Katowice 2024', 'PGL Major 2024']
        }
      ]
    },
    'valorant': {
      name: 'VALORANT',
      logo: '/vava.png',
      description: 'Our Valorant team combines tactical excellence with individual skill to dominate the competitive scene.',
      players: [
        {
          id: 1,
          name: 'DUELISTA',
          realName: 'Gabriel',
          role: 'Duelist',
          image: '/gabriel.png',
          stats: { kd: '1.38', rating: '1.28', headshot: '44%' },
          achievements: ['VCT Champions 2024', 'Masters Berlin 2024']
        },
        {
          id: 2,
          name: 'SAGE',
          realName: 'Ana Ferreira',
          role: 'Sentinel',
          image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.12', rating: '1.15', headshot: '22%' },
          achievements: ['VCT Champions 2024', 'Game Changers 2024']
        },
        {
          id: 3,
          name: 'SOVA',
          realName: 'Diego Martins',
          role: 'Initiator',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.05', rating: '1.22', headshot: '19%' },
          achievements: ['Masters Berlin 2024', 'VCT Stage 2']
        },
        {
          id: 4,
          name: 'OMEN',
          realName: 'Carlos Souza',
          role: 'Controller',
          image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '0.98', rating: '1.18', headshot: '21%' },
          achievements: ['VCT Champions 2024', 'Masters Reykjavik']
        },
        {
          id: 5,
          name: 'JETT',
          realName: 'Mariana Silva',
          role: 'Duelist',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
          stats: { kd: '1.42', rating: '1.35', headshot: '26%' },
          achievements: ['VCT Champions 2024', 'Game Changers 2024']
        }
      ]
    }
  };

  const currentGame = gameData[gameId as keyof typeof gameData];

  if (!currentGame) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
        <button 
          onClick={() => navigate('/games')}
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition-colors"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/games')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Games
        </button>

        {/* Game Header */}
        <div className="flex items-center gap-6 mb-8">
          <img 
            src={currentGame.logo} 
            alt={currentGame.name}
            className="h-20 w-20 object-contain filter brightness-0 invert"
          />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{currentGame.name}</h1>
            <p className="text-gray-300 max-w-3xl">{currentGame.description}</p>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">15+</div>
            <div className="text-gray-400 text-sm">Tournaments Won</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <div className="text-gray-400 text-sm">Win Rate</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
            <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">1.24</div>
            <div className="text-gray-400 text-sm">Team Rating</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
            <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">#1</div>
            <div className="text-gray-400 text-sm">World Ranking</div>
          </div>
        </div>

        {/* Section Headers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">TEAMMATES</h2>
          <h3 className="text-3xl font-bold text-white">PLAYERS</h3>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {currentGame.players.map(player => (
            <div key={player.id} className="group cursor-pointer">
              <div className="bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all duration-300 overflow-hidden">
                {/* Player Image */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-2 py-1 text-xs font-bold rounded">
                      {player.role}
                    </span>
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{player.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{player.realName}</p>
                  
                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">K/D:</span>
                      <span className="text-white font-bold">{player.stats.kd}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-white font-bold">{player.stats.rating}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">HS%:</span>
                      <span className="text-white font-bold">{player.stats.headshot}</span>
                    </div>
                  </div>

                  {/* Latest Achievement */}
                  {player.achievements.length > 0 && (
                    <div className="border-t border-slate-700 pt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="h-3 w-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-bold">LATEST</span>
                      </div>
                      <p className="text-gray-300 text-xs">{player.achievements[0]}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Matches */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">RECENT MATCHES</h2>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="text-center text-gray-400">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Match history coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayersPage;