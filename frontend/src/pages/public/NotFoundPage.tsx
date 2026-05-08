import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-8">
      <div className="text-center">
        <h1 className="font-serif text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 btn-primary"
        >
          Go Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
