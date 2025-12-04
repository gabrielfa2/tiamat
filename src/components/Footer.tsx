import React from 'react';
import { Twitter, Linkedin, Github, Youtube, Slack, Globe } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
  return (
    <footer className="relative text-white py-16 overflow-hidden">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black via-20% to-black"></div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Logo and Content */}
          <div className="text-center lg:text-left">
            {/* Logo Circle */}
            <div className="relative w-32 h-32 mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="Tiamat"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 blur-md opacity-50"></div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Join the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
                Movement
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              Become a Tiamate.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-colors">
                JOIN US
              </button>
              <VisitorCounter />
            </div>
          </div>

          {/* Right Side - Links and Social */}
          <div className="text-center lg:text-right">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-8 mb-8">
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-end gap-4 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright and Made with */}
            <div className="text-gray-500 text-sm">
              <p className="mb-2">Copyright © 2025 Tiamat. All rights reserved.</p>
              <div className="flex items-center justify-center lg:justify-end gap-2">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="Tiamat"
                  className="w-4 h-4 object-contain"
                />
                <span>Lets go Tiamat!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
