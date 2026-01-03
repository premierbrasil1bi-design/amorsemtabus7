import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const BookForm = () => {
  const { books, addBook, updateBook, loading: contextLoading } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: '',
    category: 'Comunicação',
    cover: '',
    price: '',
    description: '',
    excerpt: '',
    targetAudience: '',
    buyLink: '',
    editorialReview: {
      stars: 5,
      text: ''
    },
    testimonials: []
  });

  useEffect(() => {
    if (contextLoading) return;

    if (isEditing) {
      const book = books.find(b => b.id === (typeof b.id === 'string' ? id : Number(id)));
      if (book) {
        setFormData(book);
      } else {
        // Se parou de carregar e não achou o livro, volta
        navigate('/admin');
      }
    }
  }, [id, books, isEditing, contextLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      editorialReview: { ...prev.editorialReview, [name]: value }
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('covers')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, cover: publicUrl }));
    } catch (error) {
      alert('Erro ao fazer upload da imagem: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Testimonial Management
  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', role: 'Comprador verificado', text: '', stars: 5 }]
    }));
  };

  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...formData.testimonials];
    newTestimonials[index][field] = value;
    setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
  };

  const removeTestimonial = (index) => {
    const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Auto-generate slug if empty (normalize removes accents)
      let baseSlug = formData.slug || formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]+/g, '');
      
      const finalData = {
        ...formData,
        slug: baseSlug,
      };

      let result;
      if (isEditing) {
        result = await updateBook(finalData);
      } else {
        result = await addBook(finalData);
      }

      if (result.success) {
        navigate('/admin');
      } else {
        alert('Erro ao salvar: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      alert('Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (contextLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-wine border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-gray-700 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </button>
          <h1 className="text-xl font-bold text-gray-900">{isEditing ? 'Editar eBook' : 'Novo eBook'}</h1>
          <button 
            onClick={handleSubmit} 
            disabled={loading || uploading}
            className="bg-brand-wine text-white px-4 py-2 rounded flex items-center hover:bg-brand-wineDark disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" /> {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Info */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Informações Principais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Título do Livro</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Autor</label>
                <input required type="text" name="author" value={formData.author} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border">
                  <option value="Comunicação">Comunicação</option>
                  <option value="Intimidade">Intimidade</option>
                  <option value="Autoconhecimento">Autoconhecimento</option>
                  <option value="Conflitos">Conflitos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Preço (Ex: R$ 29,90)</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Slug (URL amigável)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Automático se vazio" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>

               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Capa do Livro</label>
                
                <div className="mt-1 flex items-center space-x-4">
                  {formData.cover && (
                    <div className="relative h-32 w-24 flex-shrink-0">
                      <img src={formData.cover} alt="Preview" className="h-full w-full object-cover rounded shadow" />
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, cover: ''}))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex-1">
                     {!formData.cover ? (
                        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-brand-wine transition-colors">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-wine hover:text-brand-wineDark focus-within:outline-none">
                                <span>Fazer upload de imagem</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">{uploading ? 'Enviando...' : 'PNG, JPG, WEBP até 2MB'}</p>
                          </div>
                        </div>
                     ) : (
                        <div className="text-sm text-gray-500">
                          <p>Imagem carregada com sucesso.</p>
                          <p className="text-xs truncate max-w-xs">{formData.cover}</p>
                        </div>
                     )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Detalhes e Vendas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Link de Compra (Hotmart/Kiwify)</label>
                <input required type="url" name="buyLink" value={formData.buyLink} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Público Alvo</label>
                <input required type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição Completa</label>
                <textarea required name="description" rows={5} value={formData.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm p-3 border"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Trecho para Degustação (Opcional)</label>
                <textarea name="excerpt" rows={8} value={formData.excerpt} onChange={handleChange} placeholder="Cole aqui os primeiros parágrafos. Use <p> para parágrafos." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm p-3 border font-serif"></textarea>
                <p className="text-xs text-gray-500 mt-1 italic">Dica: Use a tag &lt;p&gt;Texto aqui&lt;/p&gt; para separar os parágrafos corretamente no modal.</p>
              </div>
            </div>
          </div>

          {/* Editorial Review */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200 border-l-4 border-l-brand-wine">
            <h3 className="text-lg font-medium text-brand-wine mb-4 border-b pb-2">Avaliação Editorial (Privada)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                 <label className="block text-sm font-medium text-gray-700">Estrelas (1-5)</label>
                 <input type="number" min="1" max="5" name="stars" value={formData.editorialReview.stars} onChange={handleEditorialChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm h-10 px-3 border" />
              </div>
              <div className="md:col-span-3">
                 <label className="block text-sm font-medium text-gray-700">Veredito do Editor</label>
                 <textarea required name="text" rows={2} value={formData.editorialReview.text} onChange={handleEditorialChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-wine focus:border-brand-wine sm:text-sm p-3 border"></textarea>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
               <h3 className="text-lg font-medium text-gray-900">Depoimentos Manuais</h3>
               <button type="button" onClick={addTestimonial} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 flex items-center">
                 <Plus className="w-3 h-3 mr-1" /> Adicionar
               </button>
            </div>
            
            <div className="space-y-6">
              {formData.testimonials.map((t, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded border border-gray-200 relative">
                  <button type="button" onClick={() => removeTestimonial(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Nome</label>
                      <input type="text" value={t.name} onChange={(e) => updateTestimonial(index, 'name', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm h-8 px-2 border" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Cargo (Ex: Comprador)</label>
                      <input type="text" value={t.role} onChange={(e) => updateTestimonial(index, 'role', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm h-8 px-2 border" />
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-gray-500">Estrelas</label>
                       <input type="number" min="1" max="5" value={t.stars} onChange={(e) => updateTestimonial(index, 'stars', parseInt(e.target.value))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm h-8 px-2 border" />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-gray-500">Depoimento</label>
                      <textarea value={t.text} onChange={(e) => updateTestimonial(index, 'text', e.target.value)} rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm p-2 border"></textarea>
                    </div>
                  </div>
                </div>
              ))}
              {formData.testimonials.length === 0 && (
                <p className="text-sm text-gray-500 italic text-center py-4">Nenhum depoimento cadastrado.</p>
              )}
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

export default BookForm;
