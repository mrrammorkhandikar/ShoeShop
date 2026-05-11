import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { productService } from '../../api/product.service';
import { cartService } from '../../api/cart.service';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { toast } from 'sonner';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const wishlistIds = useSelector((state: RootState) => state.wishlist.productIds);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInWishlist = wishlistIds.includes(parseInt(id!));
  const isInCart = cartItems.some(item => item.productId === parseInt(id!));

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(parseInt(id!)),
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: () =>
      cartService.addToCart({
        productId: product!.id,
        quantity,
      }),
    onSuccess: (item) => {
      dispatch(addItem(item));
      toast.success('Added to cart!');
      setQuantity(1);
    },
    onError: () => {
      toast.error('Failed to add to cart');
    },
  });

  const handleAddToCart = () => {
    if (!product) return;
    addToCartMutation.mutate();
  };

  const handleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product.id));
      toast.success('Added to wishlist');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
        <div className="container-custom">
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
        <div className="container-custom text-center">
          <p className="text-slate-600 dark:text-slate-400">Product not found</p>
        </div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="card p-6 flex items-center justify-center h-96 bg-slate-200 dark:bg-slate-800">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-6xl">👟</div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{product.brand}</p>
            <h1 className="font-serif text-4xl font-bold mb-4">{product.name}</h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-amber-500">
                ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending || product.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addToCartMutation.isPending ? 'Adding...' : isInCart ? '✓ In Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-2.5 border rounded-lg font-medium transition-colors ${
                  isInWishlist
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600 text-red-600 dark:text-red-400'
                    : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {isInWishlist ? '❤️ In Wishlist' : '🤍 Wishlist'}
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Category</p>
                  <p className="font-semibold">{product.Category?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Brand</p>
                  <p className="font-semibold">{product.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
