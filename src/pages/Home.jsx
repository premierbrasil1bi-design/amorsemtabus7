import React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/content';
import { ChevronRight, ShieldCheck, BookOpen, Star } from 'lucide-react';

const Home = () => {
  const { headline, subheadline, cta } = siteData.home;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-brand-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-brand-wine mb-6 leading-tight">
              {siteData.home.headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed font-light">
              {siteData.home.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/ebooks" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-wine hover:bg-brand-wineDark md:text-lg transition duration-300 shadow-sm">
                {siteData.home.cta}
              </Link>
              <Link to="/quiz" className="inline-flex items-center justify-center px-8 py-3 border border-brand-wine text-base font-medium rounded-md text-brand-wine bg-transparent hover:bg-brand-wine hover:text-white md:text-lg transition duration-300">
                Fazer Quiz de Recomendação
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Banner Section */}
      <section className="bg-brand-wine py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-white text-center md:text-left">
             <h3 className="font-serif text-2xl font-bold mb-2">Está vivendo uma crise específica?</h3>
             <p className="text-brand-beige/80">Responda a 3 perguntas rápidas e receba uma indicação cirúrgica.</p>
           </div>
           <Link to="/quiz" className="bg-brand-gold text-brand-wineDark font-bold py-3 px-8 rounded hover:bg-white transition-colors shadow-lg whitespace-nowrap">
             Consultar Curadoria
           </Link>
        </div>
      </section>

      {/* Social Proof Teaser (Static / Persuasive Copy) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-2xl text-brand-text italic mb-8 max-w-3xl mx-auto">
            "Finalmente uma curadoria que entende que relacionamento não é conto de fadas, mas construção diária."
          </p>
          <div className="flex items-center justify-center gap-2">
             <div className="w-10 h-1 bg-brand-wine/20 rounded"></div>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Leitor verificado</span>
             <div className="w-10 h-1 bg-brand-wine/20 rounded"></div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="bg-white p-8 rounded shadow-sm border-t-4 border-brand-wine hover:-translate-y-1 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-brand-wine mb-4" />
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">Acervo Filtrado</h3>
              <p className="text-gray-600 leading-relaxed">
                Você não precisa ler 50 livros ruins para achar um bom. Nós já fizemos isso. Aqui só entra o que realmente funciona.
              </p>
            </div>

            <div className="bg-white p-8 rounded shadow-sm border-t-4 border-brand-wine hover:-translate-y-1 transition-transform duration-300">
              <ShieldCheck className="w-8 h-8 text-brand-wine mb-4" />
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">Sem Promessas Vazias</h3>
              <p className="text-gray-600 leading-relaxed">
                Banimos termos como "fórmula mágica" ou "amarração". Trabalhamos com psicologia, diálogo e maturidade.
              </p>
            </div>

            <div className="bg-white p-8 rounded shadow-sm border-t-4 border-brand-wine hover:-translate-y-1 transition-transform duration-300">
              <Star className="w-8 h-8 text-brand-wine mb-4" />
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">Avaliações Reais</h3>
              <p className="text-gray-600 leading-relaxed">
                Depoimentos de quem realmente leu e aplicou. Transparência total sobre o impacto de cada obra.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;