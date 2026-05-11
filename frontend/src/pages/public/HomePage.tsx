import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RotateCcw, Zap, TrendingUp, Award } from 'lucide-react';
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
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 md:py-40">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/50">
                <span className="text-amber-300 text-sm font-semibold">✨ Premium Collection 2026</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Step Into <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Excellence</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-lg">
                Discover our curated collection of premium shoes. From timeless classics to cutting-edge designs, find your perfect pair.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                  View Lookbook
                </button>
              </div>
              
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold text-amber-400">500+</p>
                  <p className="text-sm text-slate-400">Premium Styles</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">50K+</p>
                  <p className="text-sm text-slate-400">Happy Customers</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-3xl flex items-center justify-center border border-white/20 backdrop-blur-sm overflow-hidden">
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-bounce">👟</div>
                    <p className="text-white/80 font-semibold">Premium Footwear</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-8 md:py-12 border-y border-slate-200 dark:border-slate-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <RotateCcw className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Award Winning</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Best in class</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 md:py-8">
        <div className="container-custom flex items-center justify-center gap-3 text-center">
          <Zap className="w-5 h-5 animate-pulse" />
          <p className="text-lg font-semibold">🎉 Limited Time: Get 20% OFF on your first order with code <span className="bg-white/20 px-3 py-1 rounded">WELCOME20</span></p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore our carefully curated collections for every style and occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoriesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))
            ) : (
              categories?.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                  className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 group-hover:from-slate-800 group-hover:to-slate-700 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6 z-10">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">👟</div>
                    <h3 className="font-semibold text-2xl mb-2">{category.name}</h3>
                    <p className="text-slate-200 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all">
                      Explore Collection
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-amber-500/5 transition-all duration-300"></div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-800 mb-4">
              <span className="text-amber-700 dark:text-amber-300 text-sm font-semibold">⭐ TRENDING NOW</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Handpicked selections from our most popular collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))
            ) : (
              productsData?.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 h-56 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-5xl">👟</div>
                      )}
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100">
                        Quick View
                      </button>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">{product.brand}</p>
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                          {product.popularity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 md:p-16 text-white">
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Stay in the Loop
              </h2>
              <p className="text-lg text-slate-200 mb-8">
                Get exclusive access to new collections, special offers, and style inspiration delivered to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-4 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-sm text-slate-400 mt-4">
                ✓ No spam, just great deals and style tips
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Loved by Customers
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              See what our satisfied customers have to say about their experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Fashion Enthusiast',
                text: 'The quality is exceptional! These shoes are not only stylish but incredibly comfortable. I\'ve already recommended ShoeShop to all my friends.',
                avatar: '👩‍🦰',
              },
              {
                name: 'Michael Chen',
                role: 'Professional',
                text: 'Outstanding service and fast shipping. The shoes arrived in perfect condition and look even better in person. Definitely my go-to store now!',
                avatar: '👨‍💼',
              },
              {
                name: 'Emma Davis',
                role: 'Athlete',
                text: 'Perfect for both casual and athletic wear. The variety is amazing and the prices are competitive. Love the easy returns policy too!',
                avatar: '👩‍🦱',
              },
            ].map((testimonial, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-amber-500/50 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex flex-col justify-center">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  New Arrivals
                </h3>
                <p className="text-blue-100 mb-6">
                  Check out our latest collection of premium shoes just added to our store.
                </p>
                <Link
                  to="/shop?sort=newest"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Explore New
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-12 text-white flex flex-col justify-center">
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Special Deals
                </h3>
                <p className="text-purple-100 mb-6">
                  Don't miss out on our exclusive discounts and limited-time offers.
                </p>
                <Link
                  to="/shop?filter=sale"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
                >
                  View Deals
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
