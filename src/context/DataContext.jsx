import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapeamento DB (snake_case) -> App (camelCase)
  const mapFromDb = (dbBook) => ({
    ...dbBook,
    buyLink: dbBook.buy_link,
    targetAudience: dbBook.target_audience,
    editorialReview: dbBook.editorial_review || { stars: 5, text: '' },
    testimonials: dbBook.testimonials || []
  });

  // Mapeamento App (camelCase) -> DB (snake_case)
  const mapToDb = (appBook) => {
    const { id, buyLink, targetAudience, editorialReview, testimonials, ...rest } = appBook;
    return {
      ...rest,
      buy_link: buyLink,
      target_audience: targetAudience,
      editorial_review: editorialReview,
      testimonials: testimonials
    };
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setBooks(data.map(mapFromDb));
      }
    } catch (error) {
      console.error('Erro ao buscar livros:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (book) => {
    try {
      // Remove ID temporário se existir, deixa o Supabase gerar o UUID
      const { id, ...bookData } = book;
      const dbPayload = mapToDb(bookData);

      const { data, error } = await supabase
        .from('ebooks')
        .insert([dbPayload])
        .select();

      if (error) throw error;

      if (data) {
        setBooks(prev => [mapFromDb(data[0]), ...prev]);
        return { success: true };
      }
    } catch (error) {
      console.error('Erro ao adicionar livro:', error.message);
      return { success: false, error: error.message };
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const dbPayload = mapToDb(updatedBook);
      
      const { error } = await supabase
        .from('ebooks')
        .update(dbPayload)
        .eq('id', updatedBook.id);

      if (error) throw error;

      setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar livro:', error.message);
      return { success: false, error: error.message };
    }
  };

  const deleteBook = async (id) => {
    try {
      const { error } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBooks(prev => prev.filter(b => b.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar livro:', error.message);
      return { success: false, error: error.message };
    }
  };

  const getBookBySlug = (slug) => {
    return books.find(b => b.slug === slug);
  };

  return (
    <DataContext.Provider value={{ books, loading, addBook, updateBook, deleteBook, getBookBySlug, fetchBooks }}>
      {children}
    </DataContext.Provider>
  );
};
