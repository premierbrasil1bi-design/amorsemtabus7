import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import BookCard from '../components/BookCard';
import { Search, X } from 'lucide-react';

const Catalog = () => {
  const { books, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Extract unique categories from books
  const categories = ['Todos', ...new Set(books.map(book => book.category).filter(Boolean))];

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  return (
    <div className="bg-brand-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-wine mb-4">Nossa Biblioteca</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Uma seleção criteriosa de eBooks para quem busca autoconhecimento e maturidade afetiva.
          </p>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-wine focus:border-brand-wine sm:text-sm transition duration-150 ease-in-out"
                placeholder="Buscar por título ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-brand-wine text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-wine border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-serif">Carregando acervo...</p>
          </div>
        ) : (
          <>
            {/* Results Info */}
            {(searchTerm || selectedCategory !== 'Todos') && (
              <div className="mb-6 text-gray-500 text-sm">
                Exibindo {filteredBooks.length} {filteredBooks.length === 1 ? 'resultado' : 'resultados'} 
                {selectedCategory !== 'Todos' && ` em "${selectedCategory}"`}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Nenhum livro encontrado</h3>
                <p className="mt-2 text-gray-500">
                  Não encontramos resultados para sua busca. Tente outros termos ou limpe os filtros.
                </p>
                <button
                  onClick={() => {setSearchTerm(''); setSelectedCategory('Todos');}}
                  className="mt-4 text-brand-wine hover:text-brand-wineDark font-medium"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
