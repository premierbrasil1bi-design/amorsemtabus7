import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { books, deleteBook } = useData();
  const { logout } = useAuth();

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este eBook? Esta ação não pode ser desfeita.')) {
      deleteBook(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-brand-wine" />
            <h1 className="text-3xl font-serif font-bold text-gray-900">Painel Administrativo</h1>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-wine"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Actions */}
        <div className="mb-6 flex justify-between items-center px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900">Gerenciar eBooks</h2>
          <Link
            to="/admin/novo"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-wine hover:bg-brand-wineDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-wine"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo eBook
          </Link>
        </div>

        {/* List */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título / Autor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                              <img className="h-10 w-10 object-cover" src={book.cover} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{book.title}</div>
                              <div className="text-sm text-gray-500">{book.author}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-surface text-brand-wine border border-brand-wine/20">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/admin/editar/${book.id}`} className="text-brand-wine hover:text-brand-wineDark mr-4 inline-flex items-center">
                            <Edit className="w-4 h-4 mr-1" /> Editar
                          </Link>
                          <button onClick={() => handleDelete(book.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                            <Trash2 className="w-4 h-4 mr-1" /> Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
