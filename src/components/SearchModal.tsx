import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchResults = [
    { id: 1, name: 'TIAMAT JERSEY 2025', type: 'Product', path: '/products/1' },
    { id: 2, name: 'Counter Strike 2 Team', type: 'Team', path: '/games/cs2/players' },
    { id: 3, name: 'Valorant Team', type: 'Team', path: '/games/valorant/players' },
    { id: 4, name: 'About Tiamat', type: 'Page', path: '/about' },
    { id: 5, name: 'All Products', type: 'Page', path: '/products' },
    { id: 6, name: 'Games', type: 'Page', path: '/games' },
  ];

  const filteredResults = searchResults.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
    setSearchTerm('');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-slate-900 rounded-lg shadow-2xl z-50 mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Search</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products, teams, pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              autoFocus
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchTerm === '' ? (
              <div className="text-center text-gray-400 py-8">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Start typing to search...</p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.path)}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                          {result.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{result.type}</p>
                      </div>
                      <Search className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;