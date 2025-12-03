import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 dark:bg-white p-2 rounded-lg text-white dark:text-slate-900 group-hover:bg-slate-800 dark:group-hover:bg-slate-100 transition-colors">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Dil Sınıfı 11
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <ul className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Konular</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Hakkında</a>
              </li>
            </ul>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 mt-auto transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>&copy; 2025 Dil Sınıfı Eğitim Platformu. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
