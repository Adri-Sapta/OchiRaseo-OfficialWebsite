'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideosProps {
  initialVideos?: any[];
  initialNextPageToken?: string | null;
  initialPrevPageToken?: string | null;
}

export default function Videos({
  initialVideos = [],
  initialNextPageToken = null,
  initialPrevPageToken = null,
}: VideosProps) {
  const [videos, setVideos] = useState<any[]>(initialVideos);
  const [nextPageToken, setNextPageToken] = useState<string | null>(initialNextPageToken);
  const [prevPageToken, setPrevPageToken] = useState<string | null>(initialPrevPageToken);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Fungsi Paginasi Kiri / Kanan
  const fetchPage = async (token: string, newPage: number) => {
    if (loading || !token) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/streams?pageToken=${token}&limit=5`);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken || null);
        setPrevPageToken(data.prevPageToken || null);
        setPage(newPage);
      }
    } catch (error) {
      console.error('Gagal mengambil halaman Stream:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="videos" className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-ochi-primary tracking-widest flex items-center gap-2"
        >
          LATEST STREAMS & VIDEOS 📺
        </motion.h2>

        {/* Indikator Halaman */}
        <span className="text-xs font-semibold text-ochi-dark/60 bg-white px-3 py-1 rounded-full border border-ochi-light shadow-sm">
          Halaman {page}
        </span>
      </div>

      {!videos || videos.length === 0 ? (
        <p className="text-center text-ochi-dark/60 py-8">Belum ada stream yang dapat ditampilkan.</p>
      ) : (
        <div className="relative">
          {/* Layer Loading saat Berpindah Halaman */}
          {loading && (
            <div className="absolute inset-0 bg-white/60 z-20 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
              <span className="text-sm font-semibold text-ochi-primary animate-pulse">Memuat stream...</span>
            </div>
          )}

          {/* Grid Layout Stream 5 Kolom (Format 16:9 Horisontal) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <AnimatePresence mode="wait">
              {videos.map((item: any, idx: number) => {
                const videoId =
                  item.id?.videoId ||
                  item.snippet?.resourceId?.videoId ||
                  (typeof item.id === 'string' ? item.id : null);

                if (!videoId) return null;

                const title = item.snippet?.title || 'YouTube Stream';
                const thumbnailUrl =
                  item.snippet?.thumbnails?.medium?.url ||
                  item.snippet?.thumbnails?.high?.url ||
                  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

                const publishDate = item.snippet?.publishedAt
                  ? new Date(item.snippet.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '';

                return (
                  <motion.a
                    key={`${videoId}-${idx}`}
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="group rounded-xl overflow-hidden bg-white border border-ochi-light shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    {/* Thumbnail Stream (16:9) */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* Informasi Judul & Tanggal */}
                    <div className="p-3 flex flex-col justify-between flex-grow">
                      <h3 className="text-ochi-dark text-xs md:text-sm font-semibold line-clamp-2 leading-snug group-hover:text-ochi-primary transition">
                        {title}
                      </h3>
                      <p className="text-[10px] text-ochi-dark/50 mt-2 flex items-center gap-1">
                        <span>🗓️</span> {publishDate}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Tombol Navigasi Paginasi Kiri & Kanan */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => prevPageToken && fetchPage(prevPageToken, page - 1)}
              disabled={!prevPageToken || loading}
              className="flex items-center gap-1 bg-white border border-ochi-light hover:bg-ochi-light/20 text-ochi-dark text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ◀ Sebelumnya
            </button>

            <button
              onClick={() => nextPageToken && fetchPage(nextPageToken, page + 1)}
              disabled={!nextPageToken || loading}
              className="flex items-center gap-1 bg-white border border-ochi-light hover:bg-ochi-light/20 text-ochi-dark text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Berikutnya ▶
            </button>
          </div>
        </div>
      )}
    </section>
  );
}