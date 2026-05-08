import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Pages
import HomePage from '../pages/public/HomePage';
import ShopPage from '../pages/public/ShopPage';
import ProductDetailsPage from '../pages/public/ProductDetailsPage';
import CartPage from '../pages/public/CartPage';
import CheckoutPage from '../pages/public/CheckoutPage';
import WishlistPage from '../pages/public/WishlistPage';
import LoginPage from '../pages/public/LoginPage';
import SignupPage from '../pages/public/SignupPage';
import UserDashboardPage from '../pages/public/UserDashboardPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'Admin' | 'User';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Admin Protected Route Component
interface AdminProtectedRouteProps {
  children: ReactNode;
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const routes = [
  // Public Routes
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailsPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/wishlist',
    element: <WishlistPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <UserDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/signup',
    element: <SignupPage />,
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminProtectedRoute>
        <AdminDashboardPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <AdminProtectedRoute>
        <AdminProductsPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <AdminProtectedRoute>
        <AdminOrdersPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminProtectedRoute>
        <AdminUsersPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/categories',
    element: (
      <AdminProtectedRoute>
        <AdminCategoriesPage />
      </AdminProtectedRoute>
    ),
  },

  // 404 Route
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
