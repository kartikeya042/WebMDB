import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar = () => (
  <nav style={{ padding: '1rem 2rem', background: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#e50914', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
      <Film style={{ marginRight: '10px' }} /> SMART MOVIE
    </Link>
    <div>
      <Link to="/" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none' }}>Home</Link>
      <Link to="/recommend" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none', border: '1px solid #e50914', padding: '5px 10px', borderRadius: '4px' }}>Smart Match</Link>
    </div>
  </nav>
);

export default Navbar;