import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { cartService } from '../../api/cart.service';
import { updateItem, removeItem, setCart } from '../../redux/slices/cartSlice';
import { toast } from 'sonner';
import { formatPrice } from '../../utils/currency';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Fetch cart if items are empty
  useEffect(() => {
    if (isAuthenticated && items.length === 0) {
      cartService.getCart()
        .then((cart) => {
          dispatch(setCart(cart));
        })
        .catch((error) => {
          console.error('Failed to load cart:', error);
        });
    }
  }, [isAuthenticated, dispatch, items.length]);

  const updateMutation = useMutation({
    mutationFn: (payload: { productId: number; quantity: number }) =>
      cartService.updateCartItem(payload),
    onSuccess: (item) => {
      dispatch(updateItem({ productId: item.productId, quantity: item.quantity }));
      toast.success('Cart updated!');
    },
    onError: () => {
      toast.error('Failed to update cart');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) =>
      cartService.removeCartItem({ productId }),
    onSuccess: (_, productId) => {
      dispatch(removeItem(productId));
      toast.success('Item removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove item');
    },
  });

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateMutation.mutate({ productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId: number) => {
    removeMutation.mutate(productId);
  };

  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.Product?.price === 'string' 
      ? parseFloat(item.Product.price) 
      : (item.Product?.price || 0);
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
        <div className="container-custom text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Please login to view your cart</p>
          <Link to="/auth/login" className="btn-primary">
            Login
          </Link>
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

        <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">Your cart is empty</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="card">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-6 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                  >
                    <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.Product?.imageUrl ? (
                        <img
                          src={item.Product.imageUrl}
                          alt={item.Product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-2xl">👟</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <a href={`/product/${item.productId}`} className="font-semibold hover:text-amber-500">
                        {item.Product?.name}
                      </a>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {item.Product?.brand}
                      </p>
                      <p className="text-lg font-bold text-amber-500">
                        {formatPrice(item.Product?.price || 0)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={updateMutation.isPending}
                          className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded hover:bg-slate-300 disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={updateMutation.isPending}
                          className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded hover:bg-slate-300 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={removeMutation.isPending}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Tax (10%)</span>
                    <span className="font-semibold">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="text-2xl font-bold text-amber-500">{formatPrice(total)}</span>
                </div>

                <Link to="/checkout" className="block w-full px-6 py-3 btn-primary text-center">
                  Proceed to Checkout
                </Link>

                <Link
                  to="/shop"
                  className="block w-full mt-3 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
