import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { AppDispatch } from '../../redux/store';
import { setAuth } from '../../redux/slices/authSlice';
import { authService } from '../../api/auth.service';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const signupMutation = useMutation({
    mutationFn: () =>
      authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    onSuccess: (data) => {
      dispatch(setAuth({ user: data.user, token: data.token }));
      navigate('/');
    },
    onError: () => {
      setError('Failed to create account');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    signupMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="font-serif text-3xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
            Join us and start shopping
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full px-6 py-2.5 btn-primary disabled:opacity-50"
            >
              {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 text-center">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-amber-500 hover:text-amber-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
