import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
      <input 
        type="text" 
        placeholder="Search for movies (e.g. Batman)..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, padding: '12px', borderRadius: '4px', border: 'none', background: '#1e293b', color: '#fff' }}
      />
      <button type="submit" style={{ padding: '12px 20px', background: '#e50914', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;