import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { RootState } from '../../redux/store';
import { formatPrice } from '../../utils/currency';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const subtotal = items.reduce((sum, item) => {
    return sum + (item.Product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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

        <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input-field"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="input-field"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="input-field"
                  />
                </div>
              </form>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <span>Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <span>PayPal</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      {item.Product?.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatPrice((item.Product?.price || 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Tax (10%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-lg">Total</span>
                <span className="text-2xl font-bold text-amber-500">{formatPrice(total)}</span>
              </div>

              <button className="w-full px-6 py-3 btn-primary">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
