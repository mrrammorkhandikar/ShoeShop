# ShoeStore Frontend

A modern, production-ready ecommerce frontend for a premium shoe store built with React, TypeScript, Vite, and Tailwind CSS.

## Features

### Public Features
- **Home Page**: Hero section, featured products, categories, testimonials, newsletter signup
- **Shop Page**: Product listing with advanced filtering (search, category, price range, sorting)
- **Product Details**: Full product information, image gallery, quantity selector, add to cart, wishlist
- **Cart Management**: View, update quantities, remove items, order summary
- **Checkout**: Shipping address form, payment method selection, order placement
- **Wishlist**: Save favorite products for later
- **User Dashboard**: View profile, order history, order status tracking
- **Authentication**: Login and signup with JWT token management

### Admin Features
- **Admin Dashboard**: Revenue analytics, order statistics, user count, product count
- **Product Management**: Create, read, update, delete products with image upload
- **Order Management**: View all orders, update order status
- **User Management**: View all users, delete users
- **Category Management**: Create, read, update, delete product categories

### Technical Features
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Dark Mode**: Complete dark mode support with theme persistence
- **State Management**: Redux Toolkit for global state, TanStack Query for API caching
- **Type Safety**: Full TypeScript implementation with strict typing
- **API Integration**: Centralized API service layer with Axios
- **Error Handling**: Global error handling with toast notifications
- **Performance**: Lazy loading, route splitting, optimized rendering
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

- **React 19+**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Toolkit**: Global state management
- **TanStack Query**: Server state management and caching
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **React Hook Form**: Form management
- **Sonner**: Toast notifications
- **Lucide React**: Icon library
- **shadcn/ui**: Component library

## Project Structure

```
src/
├── api/                    # API service layer
│   ├── axios.ts           # Axios instance with interceptors
│   ├── auth.service.ts    # Authentication API
│   ├── product.service.ts # Product API
│   ├── cart.service.ts    # Cart API
│   ├── order.service.ts   # Order API
│   ├── category.service.ts # Category API
│   └── user.service.ts    # User API
├── components/            # Reusable components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── product/          # Product components
│   ├── admin/            # Admin components
│   └── common/           # Common components
├── pages/                # Page components
│   ├── public/          # Public pages
│   └── admin/           # Admin pages
├── redux/               # Redux store and slices
│   ├── slices/         # Redux slices
│   └── store.ts        # Redux store configuration
├── routes/             # Route definitions
├── styles/             # Global styles
├── types/              # TypeScript types
├── utils/              # Utility functions
├── App.tsx             # Main App component
└── main.tsx            # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend is fully integrated with the backend API. All API calls are centralized in the `src/api/` directory:

- **Authentication**: Login, signup, token management
- **Products**: Fetch, create, update, delete products
- **Categories**: Fetch, create, update, delete categories
- **Cart**: Get cart, add items, update quantities, remove items
- **Orders**: Place orders, fetch user orders, fetch all orders (admin), update order status
- **Users**: Fetch all users (admin), delete users (admin)

### Authentication Flow

1. User logs in/signs up
2. Backend returns JWT token and user data
3. Token is stored in localStorage and Redux
4. Token is automatically added to all API requests via Axios interceptor
5. On token expiration (401 response), user is logged out and redirected to login

## State Management

### Redux (Global State)
- **Auth**: User authentication state, token management
- **Theme**: Light/dark mode preference
- **Cart**: Shopping cart items
- **Wishlist**: Wishlist items

### TanStack Query (Server State)
- Product data caching
- Order data caching
- User data caching
- Automatic refetching and invalidation

## Styling

The project uses Tailwind CSS with a custom color scheme:

- **Primary**: Brown/tan colors for luxury feel
- **Accent**: Gold/orange colors for highlights
- **Dark Mode**: Full dark mode support with proper contrast

Custom utility classes are available in `src/styles/globals.css`:
- `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.card`, `.card-hover`
- `.input-field`
- `.badge`, `.badge-primary`, `.badge-accent`
- `.skeleton`
- `.text-gradient`

## Performance Optimizations

- **Code Splitting**: Routes are lazy loaded
- **Image Optimization**: Images are served from backend S3
- **Caching**: TanStack Query caches API responses
- **Memoization**: Components are optimized with React.memo where needed
- **Bundle Size**: Tree-shaking and minification in production build

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/routes/index.tsx`
3. Use existing components and services
4. Follow the established patterns

### Adding a New API Service

1. Create service file in `src/api/`
2. Use `axiosInstance` for requests
3. Define TypeScript types in `src/types/`
4. Export service functions

### Adding a New Component

1. Create component in appropriate `src/components/` subdirectory
2. Use TypeScript for props
3. Follow naming conventions (PascalCase)
4. Export as named export

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check `.env.local` for correct API URL
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage and try logging in again
- Check if JWT token is being sent in request headers
- Verify backend JWT secret matches

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check if dark mode class is applied to html element
- Clear browser cache and rebuild

## License

This project is part of the ShoeStore ecommerce platform.

## Support

For issues or questions, please contact the development team.
