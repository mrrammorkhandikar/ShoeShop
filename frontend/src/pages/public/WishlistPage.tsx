import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { productIds } = useSelector((state: RootState) => state.wishlist);

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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productIds.map((productId) => (
              <div key={productId} className="card overflow-hidden">
                <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <div className="text-4xl">👟</div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Product {productId}</p>
                  <h3 className="font-semibold text-sm mb-2">Wishlist Item</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-amber-500">$99.99</span>
                    <button
                      onClick={() => handleRemoveFromWishlist(productId)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Link
                    to={`/product/${productId}`}
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
