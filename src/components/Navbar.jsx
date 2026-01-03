import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "text-brand-wine font-semibold" : "text-brand-text hover:text-brand-wine transition-colors";

  return (
    <nav className="bg-brand-beige border-b border-brand-wine/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-brand-wine" />
            <span className="font-serif text-2xl font-bold text-brand-text tracking-tight">Amor Sem Tabus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/sobre" className={isActive('/sobre')}>Sobre</Link>
            <Link to="/ebooks" className={isActive('/ebooks')}>Biblioteca</Link>
            <Link to="/quiz" className="bg-brand-surface text-brand-wine border border-brand-wine/20 hover:bg-brand-wine hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-current"></span>
              Descubra seu Livro
            </Link>
            <Link to="/editorial" className={isActive('/editorial')}>Nossa Curadoria</Link>
            <Link to="/contato" className={`px-5 py-2 bg-brand-wine text-white rounded hover:bg-brand-wineDark transition-colors ${location.pathname === '/contato' ? 'bg-brand-wineDark' : ''}`}>
              Contato
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-text hover:text-brand-wine focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-beige border-b border-brand-wine/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center text-center">
            <Link onClick={() => setIsOpen(false)} to="/" className="block w-full px-3 py-3 text-brand-text hover:text-brand-wine">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/sobre" className="block w-full px-3 py-3 text-brand-text hover:text-brand-wine">Sobre</Link>
            <Link onClick={() => setIsOpen(false)} to="/ebooks" className="block w-full px-3 py-3 text-brand-text hover:text-brand-wine">Biblioteca</Link>
            <Link onClick={() => setIsOpen(false)} to="/quiz" className="block w-full px-3 py-3 text-brand-wine font-bold bg-brand-surface">Descubra seu Livro</Link>
            <Link onClick={() => setIsOpen(false)} to="/editorial" className="block w-full px-3 py-3 text-brand-text hover:text-brand-wine">Nossa Curadoria</Link>
            <Link onClick={() => setIsOpen(false)} to="/contato" className="block w-full px-3 py-3 text-brand-wine font-semibold">Contato</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
