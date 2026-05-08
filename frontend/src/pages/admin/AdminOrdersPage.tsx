import { useQuery } from '@tanstack/react-query';
import { Eye, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { orderService } from '../../api/order.service';

const AdminOrdersPage = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => orderService.getAllOrders(),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100';
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100';
      case 'Shipped':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100';
      default:
        return 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100';
    }
  };

  const content = (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl font-bold">Orders</h1>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-600 dark:text-slate-400">
                    Loading...
                  </td>
                </tr>
              ) : orders?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-600 dark:text-slate-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 font-semibold">#{order.id}</td>
                    <td className="py-3 px-4">{order.User?.name || 'N/A'}</td>
                    <td className="py-3 px-4 font-semibold text-amber-500">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <AdminLayout>{content}</AdminLayout>;
};

export default AdminOrdersPage;
