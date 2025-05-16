import React, { useState, useMemo } from 'react';
import useDebounce from '../hooks/useDebounce';
import LRUCache from '../utils/lruCache';
import { suggestions } from '../data/suggestions';
import './AutoComplete.css';

// Initialize LRU Cache with capacity of 10
const searchCache = new LRUCache(10);

const SearchIcon = () => (
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const ClearButton = ({ onClick }) => (
  <button className="clear-button" onClick={onClick} title="Clear">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  </button>
);

const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) return [];

    // Check cache first
    const cachedResult = searchCache.get(debouncedSearchTerm.toLowerCase());
    if (cachedResult) return cachedResult;

    // If not in cache, perform the search
    const results = suggestions.filter(item =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    // Store in cache
    searchCache.put(debouncedSearchTerm.toLowerCase(), results);
    return results;
  }, [debouncedSearchTerm]);

  const highlightMatch = (text, query) => {
    if (!query) return text;
  
    
    const formattedText = text.replace(/React(?!\s)/g, 'React ');
  
    const regex = new RegExp(`(${query})`, 'gi');
  
    
    const parts = formattedText.split(regex);
  
    return parts.map((part, index) => {
      if (regex.test(part)) {
        
        const subParts = part.split(/(\s+)/); // split by spaces, keep spaces
  
        return (
          <span key={index} className="highlight">
            {subParts.map((subPart, subIndex) =>
              /\s+/.test(subPart) ? (
                subPart 
              ) : (
                <span key={subIndex}>{subPart}</span> 
              )
            )}
          </span>
        );
      } else {
        
        const subParts = part.split(/(\s+)/);
        return (
          <span key={index} className="high">
            {subParts.map((subPart, subIndex) =>
              /\s+/.test(subPart) ? subPart : <span key={subIndex}>{subPart}</span>
            )}
          </span>
        );
      }
    });
  };
  

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="autofill-container">
      <div className="search-input-wrapper">
        <SearchIcon />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        {searchTerm && <ClearButton onClick={handleClear} />}
      </div>
      
      {filteredItems.length > 0 && (
        <ul className="suggestions-list">
          {filteredItems.map(item => (
            <li key={item.id} className="suggestion-item">
              <SearchIcon />
              {highlightMatch(item.name, debouncedSearchTerm)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete; 