import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Edit2, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AddCategoryModal } from '../../components/admin/AddCategoryModal';
import { categoryService } from '../../api/category.service';

const AdminCategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => categoryService.getCategories(),
  });

  const content = (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl font-bold">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 btn-primary"
        >
          + Add Category
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
                <th className="text-left py-3 px-4 font-semibold">Products</th>
                <th className="text-left py-3 px-4 font-semibold">Created</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-600 dark:text-slate-400">
                    Loading...
                  </td>
                </tr>
              ) : categories?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-600 dark:text-slate-400">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories?.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 font-semibold">{category.name}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {category.description || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800">
                        -
                      </span>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Edit2 className="w-4 h-4" />
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

      <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );

  return <AdminLayout>{content}</AdminLayout>;
};

export default AdminCategoriesPage;
