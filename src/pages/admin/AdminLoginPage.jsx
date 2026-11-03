import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username.trim(), password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <img
            src="/img/Swarna-logo.png"
            alt="Shaasya Swornam"
            className="h-16 w-auto mx-auto object-contain"
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            Shaasya Swornam Admin
          </h1>
          <p className="text-xs text-gray-500">
            Sign in to manage store inventory, orders, and Spring Boot backend settings.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-[11px] text-emerald-800">
            <strong>Development Credentials:</strong> <br />
            Username: <code className="font-mono bg-emerald-100 px-1 rounded">admin</code> | Password: <code className="font-mono bg-emerald-100 px-1 rounded">admin123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <Link to="/" className="text-xs text-gray-500 hover:text-primary transition font-medium">
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

