import Link from 'next/link';

interface FooterProps {
  isLoggedIn?: boolean;
}

export default function Footer({ isLoggedIn = false }: FooterProps) {
  // Simple footer untuk logged in users
  if (isLoggedIn) {
    return (
      <div className="mt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border-light dark:border-border-dark pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <p>© 2025 SakuMedis. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <div className="flex items-center gap-2">
                  <span>Made with</span>
                  <span className="text-error animate-pulse-slow">❤️</span>
                  <span>for better healthcare</span>
                </div>
                <span>•</span>
                <a
                  href="https://app.sakumedis.id/terms"
                  className="hover:text-primary transition-colors"
                >
                  Syarat & Ketentuan
                </a>
                <span>•</span>
                <a
                  href="https://app.sakumedis.id/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Kebijakan Privasi
                </a>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark opacity-75">
              <p>PT. BANGUN PUKULENAM</p>
              <p>SakuMedis WebApp v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete footer untuk non-logged in users (homepage)
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light/50 dark:border-border-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            {/* Logo and Slogan unified */}
            <div className="space-y-2">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <span className="material-icons text-primary text-5xl group-hover:scale-105 transition-transform">
                  medical_services
                </span>
                <span className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  SakuMedis
                </span>
              </Link>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
                Informasi Klinis Tepat, Siap di Genggaman
              </p>
            </div>
            
            {/* Divider */}
            <div className="border-t border-border-light/30 dark:border-border-dark/30 my-4"></div>
            
            {/* PT Name */}
            <p className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
              PT. BANGUN PUKUL ENAM
            </p>

            {/* Office Address */}
            <div className="space-y-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <div className="flex items-start gap-3">
                <span className="material-icons text-lg flex-shrink-0">location_on</span>
                <span>Promenade Shop S11 Jl Kayu Tulang No. 82, Canggu, Kuta Utara, Kab. Badung, Bali, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons text-lg flex-shrink-0">phone</span>
                <a href="https://wa.me/+6281239683717" className="hover:text-primary transition-colors">
                  +62 812-3968-3717 (dr. Satiya Nanjaya)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons text-lg flex-shrink-0">email</span>
                <a href="mailto:sakumedis@pukulenam.id" className="hover:text-primary transition-colors">sakumedis@pukulenam.id</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://sakumedis.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 flex items-center justify-center text-primary transition-colors"
                aria-label="Website"
              >
                <span className="material-icons">language</span>
              </a>
              <a
                href="https://instagram.com/sakumedis.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 flex items-center justify-center text-primary transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border-light/50 dark:border-border-dark/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <p>
              © 2025 SakuMedis • Made with{' '}
              <span className="text-error animate-pulse-slow">❤️</span> for better
              healthcare
            </p>
            <div className="flex items-center gap-3">
              <p className="font-medium">Bangga Buatan Indonesia</p>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Logo_Bangga_Buatan_Indonesia.svg" 
                alt="Bangga Buatan Indonesia" 
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
