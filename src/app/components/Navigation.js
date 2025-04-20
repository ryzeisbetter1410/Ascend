'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { path: '/workouts', label: 'Workouts', icon: '💪' },
    { path: '/focus', label: 'Focus', icon: '🎯' },
    { path: '/nutrition', label: 'Nutrition', icon: '🥗' },
    { path: '/progress', label: 'Progress', icon: '📈' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 md:top-0 md:bottom-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Only visible on desktop */}
          <Link 
            href="/"
            className="hidden md:flex items-center gap-2 text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            <span className="text-2xl">🚀</span>
            <span>Ascent</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex-1 flex justify-center md:justify-end gap-1 md:gap-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col md:flex-row items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-xl md:text-base">{item.icon}</span>
                <span className="text-sm md:text-base">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 