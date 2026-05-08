import { useQuery } from '@tanstack/react-query';
import { BarChart3, Users, Package, ShoppingCart } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { orderService } from '../../api/order.service';
import { userService } from '../../api/user.service';
import { productService } from '../../api/product.service';

const AdminDashboardPage = () => {
  const { data: orders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => orderService.getAllOrders(),
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => userService.getUsers(),
  });

  const { data: productsData } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productService.getProducts({ limit: 100 }),
  });

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.totalPrice), 0) || 0;
  const totalOrders = orders?.length || 0;
  const totalUsers = users?.length || 0;
  const totalProducts = productsData?.pagination.total || 0;

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      label: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
  ];

  const content = (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders?.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">{order.User?.name}</td>
                  <td className="py-3 px-4 font-semibold text-amber-500">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
                        : order.status === 'Cancelled'
                        ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <AdminLayout>{content}</AdminLayout>;
};

export default AdminDashboardPage;
