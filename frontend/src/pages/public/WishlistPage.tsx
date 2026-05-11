import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { formatPrice } from '../../utils/currency';
import { productService } from '../../api/product.service';

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { productIds } = useSelector((state: RootState) => state.wishlist);

  // Fetch all wishlist products
  const { data: products, isLoading } = useQuery({
    queryKey: ['wishlist-products', productIds],
    queryFn: async () => {
      if (productIds.length === 0) return [];
      const productPromises = productIds.map(id => productService.getProductById(id));
      return Promise.all(productPromises);
    },
    enabled: productIds.length > 0,
  });

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="font-serif text-4xl font-bold mb-8">Wishlist</h1>

        {productIds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">Your wishlist is empty</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div key={product.id} className="card overflow-hidden group">
                <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-4xl">👟</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold uppercase">{product.brand}</p>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-amber-500">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full px-4 py-2 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-amber-600 transition-colors text-center text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
