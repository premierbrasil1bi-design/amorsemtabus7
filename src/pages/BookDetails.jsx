import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ExternalLink, ShieldCheck, Check, BookOpen } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';
import ReadingModal from '../components/ReadingModal';

const BookDetails = () => {
  const { slug } = useParams();
  const { getBookBySlug, loading } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const book = getBookBySlug(slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-brand-beige">
        <div className="w-16 h-16 border-4 border-brand-wine border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-serif">Carregando obra...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-brand-beige">
        <h2 className="text-2xl font-serif text-brand-wine mb-2">Obra não encontrada.</h2>
        <p className="text-gray-600 mb-6">Talvez o link esteja incorreto ou o livro tenha sido removido.</p>
        <Link to="/ebooks" className="text-brand-wine underline hover:text-brand-wineDark font-medium">Voltar à biblioteca</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to="/ebooks" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-wine transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para a vitrine
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Cover */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-auto object-cover rounded shadow-inner" 
                />
              </div>
              
              {/* Trust Badges */}
              <div className="mt-6 flex justify-center gap-6 text-xs text-gray-500">
                <div className="flex flex-col items-center gap-1 text-center">
                   <ShieldCheck className="w-5 h-5 text-brand-wine" />
                   <span>Compra Segura<br/>(Link Externo)</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                   <Check className="w-5 h-5 text-brand-wine" />
                   <span>Curadoria<br/>Verificada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7">
            
            {/* Category Tag */}
            <span className="inline-block px-3 py-1 rounded-full bg-brand-surface text-brand-wine text-xs font-bold uppercase tracking-wider mb-4 border border-brand-wine/20">
              {book.category || "Geral"}
            </span>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-brand-text mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-light">
              <span className="italic">por</span> <span className="font-medium text-brand-text">{book.author}</span>
            </p>

            {/* Price Box */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif font-bold text-brand-wine">{book.price}</span>
              </div>
              <span className="inline-flex items-center justify-center px-3 py-1 rounded bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                <Check className="w-3 h-3 mr-1.5" /> Disponível Imediatamente
              </span>
            </div>

            {/* Preview Button (New) */}
            {book.excerpt && (
              <div className="mb-8">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 text-brand-wine border border-brand-wine/30 bg-brand-wine/5 px-4 py-2 rounded hover:bg-brand-wine hover:text-white transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4" /> Ler Primeiras Páginas
                </button>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-stone prose-lg mb-8 text-gray-700 leading-relaxed">
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">Sinopse</h3>
              <p>{book.description}</p>
            </div>

            {/* Target Audience */}
            <div className="bg-gradient-to-r from-brand-surface to-transparent border-l-4 border-brand-wine p-5 mb-8 rounded-r">
              <strong className="block text-xs uppercase tracking-widest text-brand-wine mb-2 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-wine"></span>
                Leitura indicada para:
              </strong>
              <p className="text-base font-medium text-gray-800">{book.targetAudience}</p>
            </div>

            {/* Editorial Review Highlight */}
            <div className="mb-10 p-6 bg-brand-wine text-white rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-brand-gold">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-bold text-xs uppercase tracking-widest">Veredito Editorial</h3>
                </div>
                <p className="text-xl font-serif italic leading-relaxed text-white/95">
                  "{book.editorialReview.text}"
                </p>
                <div className="mt-4 flex gap-1">
                   {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < book.editorialReview.stars ? 'text-brand-gold fill-current' : 'text-brand-wineDark fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                   ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 mb-16">
              <a 
                href={book.buyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-text text-white text-lg font-bold py-4 px-8 rounded hover:bg-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Adquirir eBook Agora <ExternalLink className="w-5 h-5" />
              </a>
              <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-3 h-3" />
                <span>Pagamento processado em ambiente seguro</span>
              </div>
            </div>

            {/* Review Section (Social Proof + Form) */}
            <ReviewSection testimonials={book.testimonials} bookTitle={book.title} />

          </div>
        </div>
      </div>
      
      <ReadingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        book={book} 
      />
    </div>
  );
};

export default BookDetails;
