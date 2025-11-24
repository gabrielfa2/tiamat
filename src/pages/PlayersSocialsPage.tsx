import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Instagram, Twitter, Youtube, Music } from 'lucide-react';

const PlayersSocialsPage = () => {
  const navigate = useNavigate();

  const players = [
    {
      id: 1,
      name: 'DRAGONFIRE',
      realName: 'Marcus Silva',
      role: 'Team Lead',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      socials: {
        instagram: '#',
        twitter: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 2,
      name: 'VENOM',
      realName: 'João Santos',
      role: 'Professional Player',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      socials: {
        instagram: '#',
        twitter: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 3,
      name: 'SHADOW',
      realName: 'Pedro Costa',
      role: 'Professional Player',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      socials: {
        instagram: '#',
        twitter: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 4,
      name: 'STORM',
      realName: 'Lucas Oliveira',
      role: 'Professional Player',
      image: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
      socials: {
        instagram: '#',
        twitter: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 5,
      name: 'CHAOS',
      realName: 'Rafael Lima',
      role: 'Professional Player',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
      socials: {
        instagram: '#',
        twitter: '#',
        youtube: '#',
        tiktok: '#'
      }
    }
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">TIAMAT FAMILY</h1>
          <p className="text-gray-300">Follow our players on their social media channels</p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {players.map(player => (
            <div key={player.id} className="group">
              <div className="bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all duration-300 overflow-hidden rounded-lg">
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
                    <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
                      {player.role}
                    </span>
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{player.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{player.realName}</p>

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center">
                    <a
                      href={player.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-blue-600 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white"
                      title="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href={player.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-blue-600 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white"
                      title="Twitter/X"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={player.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-blue-600 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white"
                      title="YouTube"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a
                      href={player.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-blue-600 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white"
                      title="TikTok"
                    >
                      <Music className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersSocialsPage;
