'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getInitials, getAvatarImageUrl, getAvatarColor } from '@/utils/avatarHelper';

interface NavbarProps {
  title?: string;
  user?: any;
  onLogout?: (router: any) => void;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
  showBackButton?: boolean;
}

export default function Navbar({ 
  title, 
  user, 
  onLogout, 
  theme = 'light', 
  toggleTheme, 
  showBackButton = false 
}: NavbarProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-border-light dark:hover:bg-border-dark rounded-full transition-colors"
              >
                <span className="material-icons text-text-secondary-light dark:text-text-secondary-dark">
                  arrow_back
                </span>
              </button>
            )}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="material-icons text-primary text-3xl">medical_services</span>
              <span className="text-xl font-bold text-primary">SakuMedis</span>
            </Link>
            {title && (
              <>
                <span className="text-text-secondary-light dark:text-text-secondary-dark mx-2">|</span>
                <h1 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{title}</h1>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {toggleTheme && (
              <button 
                onClick={() => {
                  toggleTheme();
                }}
                className="p-2 rounded-full hover:bg-border-light dark:hover:bg-border-dark transition-colors"
              >
                <span className="material-icons text-text-secondary-light dark:text-text-secondary-dark">
                  {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
              </button>
            )}
            
            {user ? (
              /* Avatar Dropdown - Shown when logged in */
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-border-light dark:ring-border-dark hover:ring-primary transition-all"
                >
                  {user?.avatar ? (
                    <img
                      src={getAvatarImageUrl(user.avatar) || ''}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: getAvatarColor(user?.avatar || 1) }}
                    >
                      {getInitials(user?.name)}
                    </div>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden animate-slide-down z-50">
                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-background-light dark:hover:bg-background-dark transition-colors text-left"
                    >
                      <span className="material-icons text-primary">person</span>
                      <span className="text-text-primary-light dark:text-text-primary-dark font-medium">Profil</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-error/10 transition-colors text-left"
                    >
                      <span className="material-icons text-error">logout</span>
                      <span className="text-error font-medium">Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scale-in border border-border-light dark:border-border-dark">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-error text-4xl">logout</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                Keluar dari Akun?
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                Anda akan keluar dari akun Anda. Lanjutkan?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors font-semibold text-text-primary-light dark:text-text-primary-dark"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  if (onLogout) onLogout(router);
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-error hover:bg-red-600 transition-colors font-semibold text-white"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
