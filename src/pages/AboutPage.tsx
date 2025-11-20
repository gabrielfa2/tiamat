import React from 'react';
import { Trophy, Users, Target, Zap, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: 'Championships Won', value: '15+', icon: Trophy },
    { label: 'Professional Players', value: '30+', icon: Users },
    { label: 'Years of Excellence', value: '5', icon: Award },
    { label: 'Global Fans', value: '500K+', icon: Globe }
  ];

  const values = [
    {
      icon: Target,
      title: 'PRECISION',
      description: 'Every move calculated, every strategy perfected. We pursue excellence in every aspect of competitive gaming.'
    },
    {
      icon: Users,
      title: 'TEAMWORK',
      description: 'Individual skill means nothing without perfect synchronization. We are stronger together.'
    },
    {
      icon: Zap,
      title: 'INNOVATION',
      description: 'We constantly evolve our strategies and adapt to the ever-changing esports landscape.'
    },
    {
      icon: Trophy,
      title: 'VICTORY',
      description: 'Our ultimate goal is not just to compete, but to dominate and claim victory in every tournament.'
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'FOUNDATION',
      description: 'Tiamat Esports was founded with a vision to create the ultimate competitive gaming organization.'
    },
    {
      year: '2020',
      title: 'FIRST CHAMPIONSHIP',
      description: 'Our CS:GO team claimed their first major tournament victory, establishing Tiamat as a force to be reckoned with.'
    },
    {
      year: '2021',
      title: 'EXPANSION',
      description: 'We expanded into multiple games including Valorant, Apex Legends, and Rocket League.'
    },
    {
      year: '2022',
      title: 'GLOBAL RECOGNITION',
      description: 'Tiamat became a globally recognized brand with partnerships across the gaming industry.'
    },
    {
      year: '2023',
      title: 'DOMINANCE',
      description: 'Multiple championship wins across different games solidified our position as an elite organization.'
    },
    {
      year: '2024',
      title: 'THE FUTURE',
      description: 'Continuing to push boundaries and set new standards in competitive esports.'
    }
  ];

  return (
    <div className="pt-32 pb-16">
      {/* Hero Section */}
      <div className="relative h-96 mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/bannertemp.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-6xl font-bold text-white mb-4">ABOUT TIAMAT</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Born from the ancient chaos, forged in competitive fire. We are Tiamat Esports.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-lg border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">OUR MISSION</h2>
            <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
              At Tiamat Esports, we believe in the power of competitive gaming to bring people together, 
              push boundaries, and create unforgettable moments. Our mission is to build the most dominant 
              and respected esports organization in the world, while fostering a community that celebrates 
              skill, dedication, and the relentless pursuit of victory. Like the primordial dragon of chaos 
              from which we take our name, we embrace the unpredictable nature of competition and transform 
              it into our greatest strength.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">OUR JOURNEY</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-blue-600"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <div className="text-purple-400 font-bold text-sm mb-2">{item.year}</div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-slate-900 z-10"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Photo Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">THE TIAMAT FAMILY</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Tiamat Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-white text-2xl font-bold mb-2">UNITED BY VICTORY</h3>
              <p className="text-gray-200">Our players, coaches, and staff working together towards greatness</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">READY TO JOIN THE LEGEND?</h2>
            <p className="text-gray-200 mb-6">Whether you're a player, sponsor, or fan, there's a place for you in the Tiamat family.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 font-bold rounded hover:bg-gray-100 transition-colors">
                CONTACT US
              </button>
              <button className="border-2 border-white text-white px-8 py-3 font-bold rounded hover:bg-white hover:text-purple-600 transition-colors">
                VIEW CAREERS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;