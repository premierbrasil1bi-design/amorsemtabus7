import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import BookDetails from './pages/BookDetails';
import Editorial from './pages/Editorial';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BookForm from './pages/admin/BookForm';

// Scroll Helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Logic
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
           <div className="w-12 h-12 border-4 border-brand-wine border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
           <p className="text-gray-500 font-serif">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Layout for Public Pages
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-brand-beige font-sans text-brand-text">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// 404 Page Component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <h1 className="text-4xl font-serif text-brand-wine font-bold mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Página não encontrada.</p>
    <Navigate to="/" replace />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/sobre" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/ebooks" element={<PublicLayout><Catalog /></PublicLayout>} />
            <Route path="/quiz" element={<PublicLayout><Quiz /></PublicLayout>} />
            <Route path="/livro/:slug" element={<PublicLayout><BookDetails /></PublicLayout>} />
            <Route path="/editorial" element={<PublicLayout><Editorial /></PublicLayout>} />
            <Route path="/contato" element={<PublicLayout><Contact /></PublicLayout>} />

            {/* --- ADMIN AUTH --- */}
            <Route path="/admin/login" element={<Login />} />

            {/* --- ADMIN PROTECTED --- */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/novo" 
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/admin/editar/:id" 
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              } 
            />

            {/* --- CATCH ALL (404) --- */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;