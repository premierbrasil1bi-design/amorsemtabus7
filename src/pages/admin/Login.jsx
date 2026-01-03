import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { success, error: loginError } = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError(loginError || 'Credenciais inválidas.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-beige px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-brand-wine/10 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-brand-wine" />
          </div>
          <h2 className="mt-6 text-3xl font-serif font-bold text-gray-900">
            Área Administrativa
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Apenas pessoal autorizado.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-wine focus:border-brand-wine focus:z-10 sm:text-sm"
                placeholder="Email administrativo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-wine focus:border-brand-wine focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-wine hover:bg-brand-wineDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-wine transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
