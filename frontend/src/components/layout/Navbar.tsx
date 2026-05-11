import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ShoppingCart, Heart, LogOut, Moon, Sun } from 'lucide-react';
import { RootState, AppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const { mode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-soft">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-900 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-serif font-bold text-xl text-primary-900 dark:text-accent-400">ShoeStore</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium">
              Shop
            </Link>
            {isAuthenticated && user?.role === 'Admin' && (
              <Link to="/admin/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium">
                Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Desktop Only */}
            <button
              onClick={handleThemeToggle}
              className="hidden md:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {mode === 'light' ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>

            {/* Wishlist - Desktop Only */}
            <Link
              to="/wishlist"
              className="hidden md:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            >
              <Heart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                >
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden md:block px-4 py-2 bg-primary-900 dark:bg-accent-500 text-white dark:text-slate-900 rounded-lg font-medium hover:bg-primary-800 dark:hover:bg-accent-600 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-4 z-40">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
                {user?.role === 'Admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleThemeToggle();
                  }}
                  className="w-full text-left px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium flex items-center justify-between"
                >
                  {mode === 'light' ? 'Light' : 'Dark'}
                  <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${mode === 'light' ? 'bg-slate-300' : 'bg-accent-500'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${mode === 'light' ? 'translate-x-0.5' : 'translate-x-4'}`} />
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
                <button
                  onClick={() => {
                    handleThemeToggle();
                  }}
                  className="w-full text-left px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium flex items-center justify-between"
                >
                  {mode === 'light' ? 'Light' : 'Dark'}
                  <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${mode === 'light' ? 'bg-slate-300' : 'bg-accent-500'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${mode === 'light' ? 'translate-x-0.5' : 'translate-x-4'}`} />
                  </div>
                </button>
                <Link
                  to="/auth/login"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-accent-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
