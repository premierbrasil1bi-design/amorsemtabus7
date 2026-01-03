import React, { useState } from 'react';
import { Star, User, Lock, Send } from 'lucide-react';

const ReviewSection = ({ testimonials, bookTitle }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim().length > 5) {
      // Simula envio para "análise"
      setTimeout(() => {
        setSubmitted(true);
      }, 600);
    }
  };

  const renderStars = (count) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < count ? 'fill-brand-wine text-brand-wine' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );

  return (
    <div className="bg-brand-surface rounded-lg p-6 md:p-8 mt-12 border border-brand-wine/5">
      
      {/* Cabeçalho da Seção */}
      <h3 className="font-serif text-2xl font-bold text-brand-text mb-2">Títulos reais. Leituras reais.</h3>
      <p className="text-sm text-gray-500 mb-8 border-b border-gray-200 pb-4">
        O que leitores relatam após a leitura de "{bookTitle}"
      </p>

      {/* Lista de Depoimentos (Manuais) */}
      <div className="space-y-6 mb-12">
        {testimonials.map((t, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="bg-white p-2 rounded-full border border-gray-100 shadow-sm shrink-0">
               <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
               <div className="flex items-center gap-2 mb-1">
                 <span className="font-bold text-brand-text text-sm">{t.name}</span>
                 <span className="text-[10px] bg-brand-wine/10 text-brand-wine px-1.5 rounded uppercase tracking-wide font-medium">
                   {t.role}
                 </span>
               </div>
               <div className="mb-2">{renderStars(t.stars)}</div>
               <p className="text-gray-700 text-sm leading-relaxed italic">"{t.text}"</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de Engajamento (Fake) */}
      <div className="bg-white p-6 rounded border border-gray-100 shadow-sm relative overflow-hidden">
        
        <div className="flex items-center gap-2 mb-4">
           <Lock className="w-4 h-4 text-brand-gold" />
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sua opinião é confidencial</span>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <h4 className="font-serif text-lg font-bold text-brand-text mb-4">Como foi sua experiência com este conteúdo?</h4>
            
            {/* Star Input */}
            <div className="flex gap-1 mb-4 cursor-pointer">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <Star
                    key={i}
                    className={`w-6 h-6 transition-colors duration-200 ${
                      ratingValue <= (hover || rating) ? "fill-brand-wine text-brand-wine" : "text-gray-200"
                    }`}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(ratingValue)}
                  />
                );
              })}
            </div>

            <textarea
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-brand-wine focus:ring-1 focus:ring-brand-wine mb-4 bg-brand-beige resize-none"
              rows="3"
              placeholder="Escreva sua avaliação honesta..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>

            <button 
              type="submit" 
              className="w-full bg-brand-text text-white font-medium text-sm py-3 rounded hover:bg-brand-wine transition-colors flex items-center justify-center gap-2"
              disabled={rating === 0}
            >
              Enviar Avaliação Privada <Send className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              Sua avaliação será analisada por nossa equipe editorial.
            </p>
          </form>
        ) : (
          <div className="py-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
               <Send className="w-6 h-6 text-green-700" />
            </div>
            <h4 className="font-serif text-xl font-bold text-brand-text mb-2">Obrigado pelo seu relato.</h4>
            <p className="text-gray-600 text-sm">
              Sua experiência foi registrada e nos ajuda a manter a qualidade da nossa curadoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
