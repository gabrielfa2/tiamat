import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Calendar } from 'lucide-react';

const GamesPage = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'cs2',
      name: 'COUNTER STRIKE 2',
      shortName: 'CS2',
      image: '/cs2.png',
      background: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: 5,
      achievements: ['IEM Katowice 2024', 'BLAST Premier 2024'],
      description: 'Our CS2 team dominates the competitive scene with precision, strategy and teamwork.',
      status: 'inactive'
    },
    {
      id: 'valorant',
      name: 'VALORANT',
      shortName: 'VAL',
      image: '/vava.png',
      background: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: 5,
      achievements: ['VCT Champions 2024', 'Masters Berlin 2024'],
      description: 'Tactical excellence meets individual skill in our Valorant roster.',
      status: 'active'
    },
    {
      id: 'apex',
      name: 'APEX LEGENDS',
      shortName: 'APEX',
      image: '/apex.png',
      background: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: 3,
      achievements: ['ALGS Championship 2024'],
      description: 'Fast-paced battle royale action with our elite Apex Legends squad.',
      status: 'inactive'
    },
    {
      id: 'rocket-league',
      name: 'ROCKET LEAGUE',
      shortName: 'RL',
      image: '/pubg.svg',
      background: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: 3,
      achievements: ['RLCS World Championship 2024'],
      description: 'Aerial mastery and precise teamwork define our Rocket League team.',
      status: 'inactive'
    },
    {
      id: 'overwatch',
      name: 'OVERWATCH 2',
      shortName: 'OW2',
      image: '/ov2.png',
      background: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: 5,
      achievements: ['OWL Season 2024'],
      description: 'Strategic gameplay and hero mastery in the Overwatch League.',
      status: 'inactive'
    },
    {
      id: 'rainbow-six',
      name: 'RAINBOW SIX SIEGE',
      shortName: 'R6',
      image: '/rb6.png',
      background: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: 5,
      achievements: ['Six Invitational 2024'],
      description: 'Tactical FPS excellence with our Rainbow Six Siege roster.',
      status: 'inactive'
    }
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            MEET OUR TEAMS
          </h1>
          <p className="text-xl text-gray-300">The Trophy Winners</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map(game => (
            <div
              key={game.id}
              onClick={() => game.status === 'active' && navigate(`/games/${game.id}/players`)}
              className={game.status === 'active' ? "group cursor-pointer" : "group cursor-not-allowed opacity-60"}
            >
              <div className={`relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border transition-all duration-300 ${
                game.status === 'active'
                  ? 'border-slate-700 hover:border-purple-500'
                  : 'border-slate-700'
              }`}>
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={game.background}
                    alt={game.name}
                    className={`w-full h-full object-cover ${
                      game.status === 'active'
                        ? 'opacity-20 group-hover:opacity-30'
                        : 'opacity-10'
                    } transition-opacity duration-300`}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Game Logo */}
                <div className="absolute top-6 left-6">
                  <img
                    src={game.image}
                    alt={game.shortName}
                    className={`h-16 w-16 object-contain ${
                      game.status === 'active'
                        ? 'filter brightness-0 invert group-hover:filter-none group-hover:drop-shadow-glow-purple transition-all duration-300'
                        : 'filter brightness-0 invert opacity-60'
                    }`}
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`text-white px-3 py-1 text-xs font-bold rounded-full ${
                    game.status === 'active'
                      ? 'bg-green-600'
                      : 'bg-gray-600'
                  }`}>
                    {game.status === 'active' ? 'ACTIVE' : 'COMING SOON'}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">{game.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{game.players} Players</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      <span>{game.achievements.length} Titles</span>
                    </div>
                  </div>

                  {/* Recent Achievement */}
                  {game.achievements.length > 0 && (
                    <div className="mt-3 p-2 bg-purple-600/20 rounded border border-purple-500/30">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-bold">LATEST: {game.achievements[0]}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                {game.status === 'active' && (
                  <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">JOIN THE TIAMAT FAMILY</h2>
            <p className="text-gray-200 mb-6">Think you have what it takes to compete at the highest level?</p>
            <button className="bg-white text-purple-600 px-8 py-3 font-bold rounded hover:bg-gray-100 transition-colors">
              APPLY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;