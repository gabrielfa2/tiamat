import React from 'react';
import { Play } from 'lucide-react';

const VideosSection = () => {
  return (
    // 👇 MUDANÇA AQUI: Removemos 'bg-gray-50'
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* 👇 MUDANÇA AQUI: Cor do título para branco */}
        <h2 className="text-3xl font-bold text-white mb-8">OUR LATEST VIDEOS</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="World Champions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors duration-300"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6">
                <div className="bg-black bg-opacity-20 text-white px-2 py-1 text-sm mb-2 rounded">
                  CS2 AUSTIN MAJOR — VLOG
                </div>
                <h3 className="text-white text-4xl font-bold">WORLD CHAMPIONS</h3>
              </div>

              {/* Logo */}
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="Tiamat"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Side Videos */}
          <div className="space-y-6">
            {/* Video 1 */}
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Behind the Scenes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors duration-300"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Play className="h-6 w-6 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3">
                <h4 className="text-white text-sm font-bold">BEHIND THE SCENES</h4>
              </div>
            </div>

            {/* Video 2 */}
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Training Day"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors duration-300"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Play className="h-6 w-6 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3">
                <h4 className="text-white text-sm font-bold">TRAINING HIGHLIGHTS</h4>
              </div>

              <div className="absolute top-3 right-3 text-white text-xs">
                <span className="bg-purple-600 px-2 py-1 rounded">TIAMAT ACADEMY 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="border-2 border-yellow-400 text-white px-8 py-3 font-bold hover:bg-yellow-400 hover:text-black transition-colors">
            SEE THE YOUTUBE CHANNEL
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;