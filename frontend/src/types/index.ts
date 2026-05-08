// Auth Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  description?: string;
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  categoryId: number;
  stock: number;
  imageUrl?: string;
  popularity: number;
  Category?: Category;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'popularity_desc' | 'createdAt_desc';
}

// Cart Types
export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  Product?: Product;
}

export interface Cart {
  cartId: number;
  items: CartItem[];
}

export interface AddToCartPayload {
  productId: number;
  quantity?: number;
}

export interface UpdateCartItemPayload {
  productId: number;
  quantity: number;
}

export interface RemoveCartItemPayload {
  productId: number;
}

// Order Types
export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  Product?: Product;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  created_at: string;
  OrderItems?: OrderItem[];
  User?: User;
}

export interface PlaceOrderPayload {
  // Backend handles this automatically from cart
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

// Error Types
export interface ApiError {
  message: string;
  statusCode?: number;
}
