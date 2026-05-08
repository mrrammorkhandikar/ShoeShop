import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../api/product.service';
import { categoryService } from '../../api/category.service';
import { Filter, X } from 'lucide-react';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') ? parseInt(searchParams.get('category')!) : undefined;
  const sort = (searchParams.get('sort') || 'createdAt_desc') as any;

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', { page, search, category, sort }],
    queryFn: () =>
      productService.getProducts({
        page,
        limit: 12,
        search,
        category,
        sort,
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
  });

  const handleFilterChange = (key: string, value: any) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === undefined || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="container-custom">
        <h1 className="font-serif text-4xl font-bold mb-8">Shop</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="input-field"
                >
                  <option value="createdAt_desc">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popularity_desc">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 btn-primary"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : productsData?.products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 text-lg">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {productsData?.products.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="group card-hover overflow-hidden"
                    >
                      <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <div className="text-4xl">👟</div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-slate-500 mb-1">{product.brand}</p>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-amber-500">
                            ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-600">⭐ {product.popularity}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {productsData && productsData.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: productsData.pagination.totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handleFilterChange('page', i + 1)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          page === i + 1
                            ? 'btn-primary'
                            : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
