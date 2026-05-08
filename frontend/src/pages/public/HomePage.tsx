import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../api/product.service';
import { categoryService } from '../../api/category.service';

const HomePage = () => {
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productService.getProducts({ limit: 8, sort: 'popularity_desc' }),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Step Into Style
              </h1>
              <p className="text-lg text-slate-100 mb-8">
                Discover our premium collection of shoes for every occasion. From casual sneakers to elegant formal wear.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-96 bg-white/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👟</div>
                  <p className="text-white/80">Premium Footwear</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoriesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))
            ) : (
              categories?.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                  className="group card-hover p-8 text-center"
                >
                  <div className="text-5xl mb-4">👟</div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-amber-500 font-medium group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))
            ) : (
              productsData?.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group card-hover overflow-hidden"
                >
                  <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-4xl">👟</div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{product.brand}</p>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-500">
                        ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {product.popularity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-12 text-white text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-slate-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Fashion Enthusiast',
                text: 'Amazing quality and style! The shoes are comfortable and look fantastic.',
              },
              {
                name: 'Michael Chen',
                role: 'Professional',
                text: 'Great selection and fast shipping. Highly recommend ShoeStore!',
              },
              {
                name: 'Emma Davis',
                role: 'Athlete',
                text: 'Perfect for both casual and athletic wear. Love the variety!',
              },
            ].map((testimonial, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
