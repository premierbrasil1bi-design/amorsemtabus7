import React from 'react';
import { siteData } from '../data/content';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-text text-brand-beige py-16 mt-auto border-t border-brand-wine/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand & Mission */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-6 tracking-tight">{siteData.general.name}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-xs">
              {siteData.general.description}
            </p>
            <div className="inline-block border border-white/10 bg-white/5 p-4 rounded text-xs text-gray-400">
               <strong className="block text-brand-gold mb-1 uppercase tracking-wider">Aviso Legal</strong>
               {siteData.general.contentWarning}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/ebooks" className="hover:text-brand-gold transition-colors block py-1">Nossa Biblioteca</Link></li>
              <li><Link to="/editorial" className="hover:text-brand-gold transition-colors block py-1">Nossa Política Editorial</Link></li>
              <li><Link to="/sobre" className="hover:text-brand-gold transition-colors block py-1">Quem Somos</Link></li>
              <li><Link to="/contato" className="hover:text-brand-gold transition-colors block py-1">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Transparency & Legal */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Transparência</h4>
            <div className="bg-white/5 p-5 rounded border border-white/5">
              <p className="text-xs text-gray-400 leading-relaxed italic mb-4">
                "{siteData.general.footerDisclaimer}"
              </p>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><span className="hover:text-gray-300 cursor-not-allowed">Termos de Uso</span></li>
                <li><span className="hover:text-gray-300 cursor-not-allowed">Política de Privacidade</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs text-gray-600">
          <p>&copy; {year} {siteData.general.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;