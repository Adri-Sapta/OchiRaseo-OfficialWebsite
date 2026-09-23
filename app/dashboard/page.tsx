'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data State
  const [activeTab, setActiveTab] = useState<'home' | 'stream' | 'trends'>('home');
  const [channelStats, setChannelStats] = useState<any>(null);
  const [streamStats, setStreamStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Refs untuk Auto-Highlight saat Scroll
  const homeRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);

  // Auto-detect seksion mana yang sedang terlihat saat di-scroll
  useEffect(() => {
    if (!isAuthenticated || loading) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'section-home') setActiveTab('home');
          if (entry.target.id === 'section-trends') setActiveTab('trends');
          if (entry.target.id === 'section-stream') setActiveTab('stream');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (homeRef.current) observer.observe(homeRef.current);
    if (trendsRef.current) observer.observe(trendsRef.current);
    if (streamRef.current) observer.observe(streamRef.current);

    return () => observer.disconnect();
  }, [isAuthenticated, loading]);

  // Handler untuk Klik Menu Navigasi (Smooth Scroll)
  const scrollToSection = (tab: 'home' | 'stream' | 'trends') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);

    const refMap = {
      home: homeRef,
      trends: trendsRef,
      stream: streamRef,
    };

    refMap[tab]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Login Handler (Hardcoded Password: raseo2026)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'raseo2026') {
      setIsAuthenticated(true);
      setErrorMsg('');
      fetchDashboardData();
    } else {
      setErrorMsg('Kata sandi salah! Akses ditolak.');
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [resStats, resStreams] = await Promise.all([
        fetch('/api/admin/channel-stats').then((res) => res.json()),
        fetch('/api/admin/stream-stats').then((res) => res.json()),
      ]);
      setChannelStats(resStats);
      setStreamStats(resStreams);
    } catch (err) {
      console.error('Gagal memuat data dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  // Setup Data Chart Viewer Trends
  const chartData = {
    labels: [...streamStats].reverse().map((item) =>
      new Date(item.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    ),
    datasets: [
      {
        fill: true,
        label: 'Views',
        data: [...streamStats].reverse().map((item) => item.views),
        borderColor: '#e85d04',
        backgroundColor: 'rgba(232, 93, 4, 0.15)',
        tension: 0.4,
        pointBackgroundColor: '#e85d04',
      },
    ],
  };

  // Logika Tabel Paginasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStreams = streamStats.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(streamStats.length / itemsPerPage);

  // Layar Modal Login Jika Belum Terverifikasi
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-ochi-light max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-ochi-dark">Dashboard YouTuber</h1>
            <p className="text-xs text-ochi-dark/60 mt-1">
              Masukkan kata sandi untuk mengakses statistik channel Ochi.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Masukkan Password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ochi-primary/50 text-sm"
              />
              {errorMsg && <p className="text-xs text-red-500 mt-2">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-ochi-primary hover:bg-ochi-dark text-white font-bold py-3 rounded-xl transition text-sm shadow-sm"
            >
              Verifikasi & Masuk
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-xs text-ochi-dark/50 hover:underline">
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col md:flex-row">
      {/* MOBILE HEADER TOPBAR */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-bold text-ochi-dark bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Ke Home</span>
        </Link>

        <span className="font-bold text-xs text-ochi-dark">Dashboard</span>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-ochi-dark border border-gray-200 hover:bg-gray-50 focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden sticky top-[53px] z-40 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-2">
          <button
            onClick={() => scrollToSection('home')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === 'home' ? 'bg-ochi-primary/10 text-ochi-primary' : 'text-ochi-dark/70 hover:bg-gray-50'
            }`}
          >
            <span>🏠</span> Home
          </button>

          <button
            onClick={() => scrollToSection('stream')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === 'stream' ? 'bg-ochi-primary/10 text-ochi-primary' : 'text-ochi-dark/70 hover:bg-gray-50'
            }`}
          >
            <span>📊</span> Stream Stats
          </button>

          <button
            onClick={() => scrollToSection('trends')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
              activeTab === 'trends' ? 'bg-ochi-primary/10 text-ochi-primary' : 'text-ochi-dark/70 hover:bg-gray-50'
            }`}
          >
            <span>📈</span> Viewer Trends
          </button>

          <div className="pt-3 border-t border-gray-100 mt-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-ochi-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Kembali ke Web Utama</span>
            </Link>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR NAVIGATION (STICKY) */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 flex-col justify-between hidden md:flex sticky top-0 h-screen flex-shrink-0">
        <div>
          {/* Profile Channel Header */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <img
              src="/dashboard-profile.jpg"
              alt="Profile Ochi Rasheo"
              className="w-20 h-20 rounded-full object-cover border-2 border-ochi-primary p-0.5 shadow-sm"
            />
            <h2 className="mt-3 font-bold text-ochi-dark text-base">{channelStats?.title || 'Ochi Rasheo'}</h2>
            <p className="text-xs text-ochi-dark/50">Ochi Rasheo ch.</p>
          </div>

          {/* Menu Items */}
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'home'
                  ? 'bg-ochi-primary/10 text-ochi-primary'
                  : 'text-ochi-dark/70 hover:bg-gray-50'
              }`}
            >
              <span>🏠</span> Home
            </button>
            <button
              onClick={() => scrollToSection('stream')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'stream'
                  ? 'bg-ochi-primary/10 text-ochi-primary'
                  : 'text-ochi-dark/70 hover:bg-gray-50'
              }`}
            >
              <span>📊</span> Stream Stats
            </button>
            <button
              onClick={() => scrollToSection('trends')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'trends'
                  ? 'bg-ochi-primary/10 text-ochi-primary'
                  : 'text-ochi-dark/70 hover:bg-gray-50'
              }`}
            >
              <span>📈</span> Viewer Trends
            </button>
          </nav>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-ochi-dark/60 hover:text-ochi-primary transition"
        >
          <span>←</span> Kembali ke Web Utama
        </Link>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <p className="text-sm font-semibold text-ochi-primary animate-pulse">Memuat statistik channel...</p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            {/* SEKSION 1: HOME / TOP STATS CARDS */}
            <div id="section-home" ref={homeRef} className="scroll-mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Total Subscribers Card */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
                  <p className="text-xs md:text-sm font-semibold text-ochi-dark/60">Total Subscriber</p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-ochi-primary mt-2">
                    {parseInt(channelStats?.subscriberCount || '0').toLocaleString('id-ID')}
                  </h3>
                </div>

                {/* Total Channel Views Card */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
                  <p className="text-xs md:text-sm font-semibold text-ochi-dark/60">Total Channel Views</p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-ochi-primary mt-2">
                    {parseInt(channelStats?.viewCount || '0').toLocaleString('id-ID')}
                  </h3>
                </div>
              </div>
            </div>

            {/* SEKSION 2: VIEWER TRENDS CHART */}
            <div id="section-trends" ref={trendsRef} className="scroll-mt-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs">
                <h3 className="text-center font-bold text-ochi-dark text-base md:text-lg mb-6">
                  Tren Views per Stream
                </h3>
                <div className="h-64 w-full">
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { grid: { color: '#f3f4f6' } },
                        x: { grid: { display: false } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SEKSION 3: DETAIL STREAM STATS TABLE */}
            <div id="section-stream" ref={streamRef} className="scroll-mt-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-[11px] font-bold text-ochi-dark/50 uppercase tracking-wider">
                        <th className="py-3 px-4">Judul Stream</th>
                        <th className="py-3 px-4">Tanggal</th>
                        <th className="py-3 px-4">Views</th>
                        <th className="py-3 px-4">Likes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
                      {currentStreams.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img
                              src={item.thumbnail}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <span className="font-semibold text-ochi-dark line-clamp-1">{item.title}</span>
                          </td>
                          <td className="py-3.5 px-4 text-ochi-dark/60 whitespace-nowrap">
                            {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-ochi-dark">
                            {item.views.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-ochi-dark">
                            {item.likes.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* PAGINASI TABEL STREAM */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-ochi-dark rounded-xl disabled:opacity-40 transition"
                  >
                    Sebelumnya
                  </button>

                  <span className="text-xs text-ochi-dark/60">
                    Halaman {currentPage} dari {totalPages || 1}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-ochi-dark rounded-xl disabled:opacity-40 transition"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}