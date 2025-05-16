import { useState, useCallback } from 'react';
import { debounce } from '../utils/debounce';
import cache from '../utils/lruCache';
import { suggestions } from '../data/suggestions';

function AutofillInput() {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const filterSuggestions = useCallback(
    debounce((searchQuery) => {
      const cacheKey = `query_${searchQuery}`;
      const cachedResult = cache.get(cacheKey);
      
      if (cachedResult) {
        setFilteredSuggestions(cachedResult);
        return;
      }

      const filtered = suggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      cache.set(cacheKey, filtered);
      setFilteredSuggestions(filtered);
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      filterSuggestions(value);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredSuggestions([]);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="highlight">{part}</span> : 
        part
    );
  };

  return (
    <div className="autofill-container">
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
        />
        {query && (
          <button onClick={clearSearch} className="clear-button">
            ✕
          </button>
        )}
      </div>
      {filteredSuggestions.length > 0 && (
        <div className="suggestions-list">
          {filteredSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="suggestion-item">
              <span className="search-icon">🔍</span>
              {highlightMatch(suggestion.name, query)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutofillInput;