import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { AppDispatch, RootState } from '../../redux/store';
import { setAuth } from '../../redux/slices/authSlice';
import { authService } from '../../api/auth.service';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // If already logged in as admin, redirect to dashboard
  if (isAuthenticated && user?.role === 'Admin') {
    navigate('/admin/dashboard');
    return null;
  }

  const loginMutation = useMutation({
    mutationFn: () => authService.login(formData),
    onSuccess: (data) => {
      if (data.user.role !== 'Admin') {
        setError('Only admins can access this page. Please use /auth/login for user login');
        return;
      }
      dispatch(setAuth({ user: data.user, token: data.token }));
      navigate('/admin/dashboard');
    },
    onError: () => {
      setError('Invalid email or password');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Secure Admin Access</p>
        </div>

        {/* Login Card */}
        <div className="card p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">Demo Credentials:</p>
              <p className="text-xs text-blue-800 dark:text-blue-400">Email: admin@example.com</p>
              <p className="text-xs text-blue-800 dark:text-blue-400">Password: admin123</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-2.5 btn-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Admin Login'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Not an admin?{' '}
              <button
                onClick={() => navigate('/auth/login')}
                className="text-amber-500 hover:text-amber-600 font-medium"
              >
                User Login
              </button>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>This is a secure admin area. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
