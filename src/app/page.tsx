'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const heroSceneRef = useRef<HTMLElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const heroIconRef = useRef<HTMLSpanElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const heroLeftRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId: number | null = null;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY || 0;
        const viewportH = window.innerHeight || 1;

        // Hero scene parallax
        const sceneEl = heroSceneRef.current;
        if (sceneEl) {
          const sceneTop = sceneEl.offsetTop;
          const sceneH = sceneEl.offsetHeight;
          const maxScroll = Math.max(1, sceneH - viewportH);
          const rawProgress = (scrollY - sceneTop) / maxScroll;
          const progress = clamp01(rawProgress);
          const easedProgress = easeInOutCubic(progress);

          const glowEl = heroGlowRef.current;
          const iconEl = heroIconRef.current;
          const textEl = heroTextRef.current;
          const leftEl = heroLeftRef.current;

          if (glowEl) {
            const y = lerp(0, 60, easedProgress);
            const scale = lerp(1, 1.2, easedProgress);
            const opacity = lerp(0.9, 0.3, easedProgress);
            glowEl.style.opacity = String(opacity);
            glowEl.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          }

          if (iconEl) {
            const y = lerp(0, -80, easedProgress);
            const scale = lerp(1, 0.85, easedProgress);
            const rotate = lerp(0, -8, easedProgress);
            iconEl.style.transform = `translate3d(0, ${y}px, 0) scale(${scale}) rotateZ(${rotate}deg)`;
          }

          if (textEl) {
            const y = lerp(0, -40, easedProgress);
            const opacity = lerp(1, 0.4, easedProgress);
            textEl.style.opacity = String(opacity);
            textEl.style.transform = `translate3d(0, ${y}px, 0)`;
          }

          if (leftEl) {
            const y = lerp(0, 30, easedProgress);
            leftEl.style.transform = `translate3d(0, ${y}px, 0)`;
          }
        }

        // Features section - staggered fade-in
        const featuresEl = featuresRef.current;
        if (featuresEl) {
          const rect = featuresEl.getBoundingClientRect();
          const featuresProgress = clamp01(1 - (rect.top / viewportH));
          const cards = featuresEl.querySelectorAll('.feature-card');
          
          cards.forEach((card, index) => {
            const htmlCard = card as HTMLElement;
            const delay = index * 0.08;
            const cardProgress = clamp01((featuresProgress - delay) / 0.3);
            const easedCardProgress = easeOutCubic(cardProgress);
            
            const y = lerp(40, 0, easedCardProgress);
            const opacity = lerp(0, 1, easedCardProgress);
            htmlCard.style.opacity = String(opacity);
            htmlCard.style.transform = `translate3d(0, ${y}px, 0)`;
          });
        }

        // CTA section subtle parallax
        const ctaEl = ctaSectionRef.current;
        if (ctaEl) {
          const rect = ctaEl.getBoundingClientRect();
          const ctaProgress = clamp01((viewportH - rect.top) / viewportH);
          const y = lerp(20, 0, easeOutCubic(ctaProgress));
          ctaEl.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <Navbar title="" user={null} theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Coming Soon Badge */}
      <section className="bg-gradient-to-r from-primary to-accent py-6 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-white text-lg sm:text-2xl font-semibold flex items-center justify-center gap-3">
            <span>Segera hadir di</span>
            <span className="inline-flex items-center gap-2">
              <i className="fab fa-android text-2xl"></i>
              <span>Android</span>
            </span>
            <span>dan</span>
            <span className="inline-flex items-center gap-2">
              <i className="fab fa-apple text-2xl"></i>
              <span>iOS</span>
            </span>
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight">
                  Informasi Klinis Tepat,<br />
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Siap di Genggaman
                  </span>
                </h1>
                <p className="mt-6 text-xl sm:text-2xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed max-w-xl">
                  SakuMedis adalah aplikasi referensi dan perhitungan klinis yang dirancang untuk mendukung praktik dokter dan tenaga medis. Aplikasi ini menyediakan informasi klinis yang ringkas, akurat, dan mudah diakses, sehingga dapat digunakan secara praktis dalam berbagai situasi praktik sehari-hari.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
              <div className="relative" style={{ perspective: '1200px' }}>
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
                  style={{ width: '300px', height: '300px', left: '50%', top: '50%', marginLeft: '-150px', marginTop: '-150px' }}
                />
                <span
                  className="material-icons text-primary relative block"
                  style={{ fontSize: '200px', lineHeight: '200px' }}
                >
                  phone_android
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-text-primary-light dark:text-text-primary-dark mb-16 animate-fade-in-up">
            Fitur Unggulan
          </h2>
          <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up">
              <div className="w-24 h-24 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-calculator text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Kalkulator Dosis<br />Anak & Dewasa
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Perhitungan dosis obat akurat berbasis BB, usia, fungsi ginjal & hati. Dosis loading, maintenance, tapering.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-100">
              <div className="w-24 h-24 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-flask text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Kalkulasi Puyer<br />Anak & Dewasa
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Kalkulasi racikan puyer praktis dan presisi. Komposisi obat, persentase zat aktif, pembagian dosis per bungkus.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-200">
              <div className="w-24 h-24 rounded-xl bg-info flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-pills text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Database Obat &<br />Interaksi Otomatis
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                FORNAS, MIMS, guideline terkini, KFA Kemenkes. Deteksi otomatis interaksi obat & kontraindikasi.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-300">
              <div className="w-24 h-24 rounded-xl bg-warning flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-syringe text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Dosis Berdasarkan Penyakit
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Rekomendasi terapi sesuai guideline nasional & internasional. Obat lini pertama, alternatif, penyesuaian dosis.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-400">
              <div className="w-24 h-24 rounded-xl bg-success flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-book-medical text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Daftar Penyakit (SKDI)
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Kompilasi penyakit sesuai SKDI. Level kompetensi, panduan diagnosis, tata laksana klinis.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-500">
              <div className="w-24 h-24 rounded-xl bg-premium flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-chart-line text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Kalkulator Scoring Klinis
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                CURB-65, APGAR, GCS, CHA₂DS₂-VASc, HAS-BLED. Evaluasi kondisi, stratifikasi risiko, penentuan prognosis.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-600">
              <div className="w-24 h-24 rounded-xl bg-info flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-droplet text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Kalkulator<br />Keseimbangan Cairan
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Holliday-Segar, infusion rate, koreksi dehidrasi, balance cairan. Essential untuk pasien rawat inap & emergensi.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-700">
              <div className="w-24 h-24 rounded-xl bg-warning flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-x-ray text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Kamus Radiologi
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Interpretasi X-ray, USG, CT, MRI. Terminologi radiologi, temuan normal-abnormal, korelasi klinis.
              </p>
            </div>

            <div className="feature-card bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 border border-border-light dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/40 group animate-fade-in-up animation-delay-800">
              <div className="w-24 h-24 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-robot text-white" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                Konsul Saran Klinis<br />dengan AI
              </h3>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                Asisten AI untuk second opinion. Diagnosis banding, pertimbangan terapi, interpretasi data. Alat bantu keputusan klinis.
              </p>
            </div>
          </div>

          <div className="mt-12 animate-fade-in">
            <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/5 dark:to-orange-900/5 rounded-2xl border-l-4 border-warning shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 dark:bg-warning/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-warning text-2xl">warning</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    Disclaimer Penting
                  </h3>
                  <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    SakuMedis adalah <strong>alat bantu referensi klinis</strong>, bukan pengganti penilaian profesional atau keputusan medis. Gunakan sebagai <strong>pendukung</strong> (second opinion) dan selalu verifikasi dengan guideline terbaru serta kondisi spesifik pasien.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="py-16 bg-gray-50 dark:bg-background-dark will-change-transform">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl p-8 sm:p-12 text-center border-2 border-primary/20 dark:border-primary/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
              Siap Menggunakan SakuMedis?
            </h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
              Daftarkan email Anda dan dapatkan <span className="font-bold text-white bg-accent px-3 py-1.5 rounded-lg shadow-lg">2 bulan premium gratis</span> saat kami launching!
            </p>
            <form className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Nama"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 focus:outline-none focus:border-primary transition-colors text-base"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 focus:outline-none focus:border-primary transition-colors text-base"
              />
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all"
              >
                Daftar Sekarang
              </button>
            </form>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">
                Segera hadir di:
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-lg shadow-md border border-border-light dark:border-border-dark">
                  <i className="fab fa-apple text-2xl"></i>
                  <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">App Store</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-lg shadow-md border border-border-light dark:border-border-dark">
                  <i className="fab fa-google-play text-2xl text-accent"></i>
                  <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isLoggedIn={false} />
    </div>
  );
}
