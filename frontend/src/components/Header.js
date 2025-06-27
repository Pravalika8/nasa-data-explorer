
import { Link } from 'react-router-dom';
import {
  FaRocket, FaCamera, FaGlobe, FaImage, FaMeteor
} from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-gray-800 shadow p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex-wrap flex items-center gap-2 text-blue-400">
          <FaRocket /> NASA Data Explorer
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link to="/apod" className="hover:text-blue-400 flex items-center gap-1">
            <FaCamera /> APOD
          </Link>
          <Link to="/epic" className="hover:text-blue-400 flex items-center gap-1">
            <FaGlobe /> Earth
          </Link>
          <Link to="/media" className="hover:text-blue-400 flex items-center gap-1">
            <FaImage /> Media
          </Link>
          <Link to="/neo" className="hover:text-blue-400 flex items-center gap-1">
            <FaMeteor /> Asteroids
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
