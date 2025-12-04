import React, { useState } from 'react';
import { ArrowLeft, Play, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Highlight {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  duration: string;
  game: string;
  views: number;
  date: string;
  featured?: boolean;
}

const HighlightsPage = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);

  const highlights: Highlight[] = [
    {
      id: '1',
      title: 'TIAMAT vs VITALITY - Grand Final Clutch Play',
      description: 'Watch the most incredible 1v5 clutch that won us the championship. Pure skill and strategy.',
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '12:34',
      game: 'CS2',
      views: 152400,
      date: '2024-11-15',
      featured: true,
    },
    {
      id: '2',
      title: 'Top 5 Plays of IEM Katowice 2024',
      description: 'Compilation of the best moments from our IEM Katowice run. Incredible teamplay and precision.',
      thumbnail: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '8:45',
      game: 'CS2',
      views: 98600,
      date: '2024-11-10',
      featured: true,
    },
    {
      id: '3',
      title: 'VALORANT Team Highlights - Berlin Masters',
      description: 'Our Valorant squad dominates Berlin Masters with perfect executions and rotations.',
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '15:20',
      game: 'VALORANT',
      views: 87300,
      date: '2024-11-08',
      featured: true,
    },
    {
      id: '4',
      title: 'Behind the Scenes - Training Day',
      description: 'Go behind the scenes as TIAMAT prepares for the biggest tournament of the year.',
      thumbnail: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '22:15',
      game: 'ALL',
      views: 45200,
      date: '2024-11-05',
    },
    {
      id: '5',
      title: 'DRAGONFIRE Insane Headshot Streak',
      description: 'Watch our AWPer hit 7 consecutive headshots in a single round.',
      thumbnail: 'https://images.pexels.com/photos/3757955/pexels-photo-3757955.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '4:12',
      game: 'CS2',
      views: 234500,
      date: '2024-11-01',
    },
    {
      id: '6',
      title: 'VENOM Entry Fragger Masterclass',
      description: 'Learn the art of aggressive entry fragging from one of the best in the world.',
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '18:50',
      game: 'CS2',
      views: 156300,
      date: '2024-10-28',
    },
    {
      id: '7',
      title: 'DUELISTA Ace - Valorant Highlights',
      description: 'Perfect team execution leading to a clean 5k with our duelist.',
      thumbnail: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '6:30',
      game: 'VALORANT',
      views: 78900,
      date: '2024-10-25',
    },
    {
      id: '8',
      title: 'Team Documentary - The Road to Glory',
      description: 'Full documentary following TIAMAT through their journey to championship glory.',
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '45:30',
      game: 'ALL',
      views: 92100,
      date: '2024-10-20',
    },
  ];

  const filteredHighlights = selectedGame === 'all'
    ? highlights
    : highlights.filter(h => h.game === selectedGame);

  const featuredHighlights = filteredHighlights.filter(h => h.featured);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="pt-12 pb-12 bg-slate-900 min-h-screen">
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
            HIGHLIGHTS & CLIPS
          </h1>
          <p className="text-gray-300 text-lg">Watch our best moments, epic plays, and team highlights</p>
        </div>

        {/* Game Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedGame('all')}
            className={`px-6 py-2 rounded font-bold transition-colors ${selectedGame === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
          >
            ALL CONTENT
          </button>
          <button
            onClick={() => setSelectedGame('CS2')}
            className={`px-6 py-2 rounded font-bold transition-colors ${selectedGame === 'CS2'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
          >
            CS2
          </button>
          <button
            onClick={() => setSelectedGame('VALORANT')}
            className={`px-6 py-2 rounded font-bold transition-colors ${selectedGame === 'VALORANT'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
          >
            VALORANT
          </button>
        </div>

        {/* Featured Section */}
        {featuredHighlights.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">FEATURED</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredHighlights.slice(0, 2).map(highlight => (
                <div
                  key={highlight.id}
                  onClick={() => setSelectedHighlight(highlight)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all duration-300">
                    <img
                      src={highlight.thumbnail}
                      alt={highlight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-16 w-16 text-white fill-current" />
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white font-bold">
                      {highlight.duration}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{highlight.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">{formatDate(highlight.date)}</span>
                        <div className="flex items-center gap-1 text-gray-300 text-sm">
                          <Eye className="h-4 w-4" />
                          {formatViews(highlight.views)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Highlights Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">ALL HIGHLIGHTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHighlights.map(highlight => (
              <div
                key={highlight.id}
                onClick={() => setSelectedHighlight(highlight)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700 hover:border-purple-500 transition-all duration-300">
                  <img
                    src={highlight.thumbnail}
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-12 w-12 text-white fill-current" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white font-bold">
                    {highlight.duration}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{highlight.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{formatDate(highlight.date)}</span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Eye className="h-3 w-3" />
                        {formatViews(highlight.views)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedHighlight && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedHighlight(null)}
        >
          <div
            className="bg-slate-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto border border-slate-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={selectedHighlight.video}
                title={selectedHighlight.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedHighlight.title}</h2>
              <p className="text-gray-300 mb-4">{selectedHighlight.description}</p>
              <div className="flex items-center justify-between text-gray-400">
                <span>{formatDate(selectedHighlight.date)}</span>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {formatViews(selectedHighlight.views)} views
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightsPage;
