import React, { useState } from 'react';
import './SearchPro.css';

const suggestions = [
  'react tutorial',
  'react hooks examples',
  'react native vs flutter',
  'react performance optimization',
  'react state management',
  'react router dom',
  'react query tutorial',
  'react typescript guide',
  'react best practices',
  'react testing library'
];

const SearchPro = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="search-pro-container">
      <h1>SearchPro</h1>
      <div className="search-wrapper">
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
            className="search-input"
          />
          {searchTerm && (
            <button onClick={handleClear} className="clear-button">
              ✕
            </button>
          )}
        </div>
        {showSuggestions && (
          <div className="suggestions-container">
            {filteredSuggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <span className="search-icon">🔍</span>
                <span className="suggestion-text">
                  {suggestion.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => 
                    part.toLowerCase() === searchTerm.toLowerCase() ? 
                      <span key={i} className="highlight">{part}</span> : part
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPro; 