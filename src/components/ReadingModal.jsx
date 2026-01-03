import React from 'react';
import { X, BookOpen } from 'lucide-react';

const ReadingModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        <div className="relative bg-[#FDFBF7] rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full border border-gray-200">
          
          {/* Header (Book Spine Style) */}
          <div className="bg-brand-wine px-4 py-3 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-serif font-medium text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-gold" />
              Degustação: {book.title}
            </h3>
            <button
              type="button"
              className="bg-brand-wineDark rounded-full p-1 text-white hover:text-gray-200 focus:outline-none"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Book Content Body */}
          <div className="px-6 py-8 sm:px-10">
            <div className="prose prose-stone prose-lg max-w-none font-serif text-gray-800 leading-relaxed">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-sans mb-6 text-center border-b pb-4">
                Início do Capítulo 1
              </p>
              
              {book.excerpt ? (
                <div dangerouslySetInnerHTML={{ __html: book.excerpt }} />
              ) : (
                <p className="italic text-gray-500 text-center">
                  Preview não disponível para este título no momento.
                </p>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                 <p className="text-sm font-sans text-gray-500 italic mb-4">
                   Gostou do que leu? Continue a leitura completa agora.
                 </p>
                 <a 
                   href={book.buyLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-wine hover:bg-brand-wineDark transition-colors"
                 >
                   Adquirir eBook Completo
                 </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ReadingModal;
