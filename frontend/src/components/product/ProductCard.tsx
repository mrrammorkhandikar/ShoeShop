import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types';
import { RootState, AppDispatch } from '../../redux/store';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productIds: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isInWishlist = wishlistItems.includes(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product.id));
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success('Added to cart');
    // Cart functionality will be implemented in the cart page
  };

  return (
    <Link to={`/product/${product.id}`} className="group card-hover overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-4xl">👟</div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-lg transition-colors ${
              isInWishlist
                ? 'bg-accent-500 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-accent-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-accent-500">
            ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {product.popularity}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
