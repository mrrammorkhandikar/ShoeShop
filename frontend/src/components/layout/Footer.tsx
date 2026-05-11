import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-50 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">S</span>
              </div>
              <span className="font-serif font-bold text-xl">ShoeStore</span>
            </div>
            <p className="text-slate-400 text-sm">Premium footwear for every occasion.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/shop" className="hover:text-accent-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-accent-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-accent-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@shoestore.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Fashion St, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              &copy; 2026 ShoeStore. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-accent-400 transition-colors">Facebook</a>
              <a href="#" className="text-slate-400 hover:text-accent-400 transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-accent-400 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
