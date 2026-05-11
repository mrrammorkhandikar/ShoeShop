import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { routes } from './routes';
import { RootState, AppDispatch } from './redux/store';
import { setTheme } from './redux/slices/themeSlice';
import { setCart } from './redux/slices/cartSlice';
import { cartService } from './api/cart.service';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  useEffect(() => {
    // Load cart when user is authenticated
    if (isAuthenticated) {
      cartService.getCart()
        .then((cart) => {
          dispatch(setCart(cart));
        })
        .catch((error) => {
          console.error('Failed to load cart:', error);
        });
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <AppContent />
      <Toaster position="top-right" theme={mode} />
    </Router>
  );
}

export default App;
