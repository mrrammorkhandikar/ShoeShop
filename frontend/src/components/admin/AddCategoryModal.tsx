import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../../api/category.service';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory?: any;
}

export const AddCategoryModal = ({ isOpen, onClose, editingCategory }: AddCategoryModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [editingCategory, isOpen]);

  const addCategoryMutation = useMutation({
    mutationFn: () =>
      categoryService.createCategory({
        name: formData.name,
        description: formData.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setFormData({
        name: '',
        description: '',
      });
      setError('');
      onClose();
    },
    onError: () => {
      setError('Failed to add category');
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: () =>
      categoryService.updateCategory(editingCategory.id, {
        name: formData.name,
        description: formData.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setFormData({
        name: '',
        description: '',
      });
      setError('');
      onClose();
    },
    onError: () => {
      setError('Failed to update category');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Please enter category name');
      return;
    }
    setError('');
    if (editingCategory) {
      updateCategoryMutation.mutate();
    } else {
      addCategoryMutation.mutate();
    }
  };

  if (!isOpen) return null;

  const isLoading = addCategoryMutation.isPending || updateCategoryMutation.isPending;
  const buttonText = editingCategory 
    ? (updateCategoryMutation.isPending ? 'Updating...' : 'Update Category')
    : (addCategoryMutation.isPending ? 'Adding...' : 'Add Category');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Category Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 btn-primary disabled:opacity-50"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
