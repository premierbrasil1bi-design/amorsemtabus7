import React from 'react';
import { Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < count ? 'fill-brand-wine text-brand-wine' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="bg-white rounded border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Cover Image */}
      <div className="h-64 bg-gray-100 w-full overflow-hidden relative">
        <img 
          src={book.cover} 
          alt={`Capa do livro ${book.title}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
           <span className="text-white font-bold text-lg">{book.price}</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-serif text-xl font-bold text-brand-text leading-tight mb-1 group-hover:text-brand-wine transition-colors">
            {book.title}
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">{book.author}</p>
        </div>

        {/* Editorial Badge */}
        <div className="flex items-center gap-1.5 mb-4 bg-brand-surface py-1.5 px-2 rounded w-fit">
           <ShieldCheck className="w-3 h-3 text-brand-wine" />
           <div className="flex">{renderStars(book.editorialReview.stars)}</div>
        </div>

        {/* Description Snippet */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow font-light leading-relaxed">
          {book.description}
        </p>

        {/* Action */}
        <Link 
          to={`/livro/${book.slug}`} 
          className="mt-auto w-full flex items-center justify-center gap-2 border border-brand-wine text-brand-wine py-3 px-4 rounded hover:bg-brand-wine hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide"
        >
          Ver Detalhes e Opiniões <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;