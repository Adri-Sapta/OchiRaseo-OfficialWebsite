'use client';

import { motion } from 'framer-motion';

interface ScheduleProps {
  streams: any[];
  apiError?: string;
}

export default function Schedule({ streams = [], apiError }: ScheduleProps) {
  return (
    <section id="schedule" className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-ochi-light"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ochi-primary tracking-widest mb-6">
          NEXT UP STREAM 🔴
        </h2>

        {/* Notifikasi Error jika API gagal */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            <strong className="font-bold">Terjadi Masalah! </strong>
            <span>{apiError}</span>
          </div>
        )}

        {/* Tampilan Jika Tidak Ada Stream */}
        {!apiError && (!streams || streams.length === 0) && (
          <div className="text-center py-8">
            <p className="text-ochi-dark/70 font-medium mb-2">
              📅 Belum Ada Jadwal Stream Mendatang
            </p>
            <p className="text-xs text-ochi-dark/50 mb-4">
              Pantau jadwal live terbaru langsung dari channel YouTube atau Twitter Ochi!
            </p>
            <a
              href="https://x.com/ochirasheo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8ec396] hover:bg-ochi-primary text-white text-xs font-semibold px-5 py-2.5 rounded-full transition"
            >
              Lihat Update di X (Twitter)
            </a>
          </div>
        )}

        {/* Grid Tampilan Stream */}
        {!apiError && streams && streams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream, idx) => {
              // Ambil ID Video dengan aman (baik dari Search API maupun langsung)
              const videoId = stream.id?.videoId || (typeof stream.id === 'string' ? stream.id : null);
              if (!videoId) return null;

              const title = stream.snippet?.title || 'Live Stream';
              const thumbnailUrl =
                stream.snippet?.thumbnails?.medium?.url ||
                stream.snippet?.thumbnails?.high?.url ||
                `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

              const publishDate = stream.snippet?.publishedAt
                ? new Date(stream.snippet.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '';

              const liveBroadcastContent = stream.snippet?.liveBroadcastContent; // 'upcoming', 'live', atau 'none'

              return (
                <a
                  key={videoId || idx}
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl overflow-hidden border border-ochi-light bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 block relative flex flex-col justify-between"
                >
                  {/* Container Gambar Thumbnail */}
                  <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={thumbnailUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    
                    {/* Badge Status Stream */}
                    {liveBroadcastContent === 'live' && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse uppercase tracking-wider">
                        • LIVE NOW
                      </span>
                    )}
                    {liveBroadcastContent === 'upcoming' && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        ⏳ UPCOMING
                      </span>
                    )}
                  </div>

                  {/* Info Judul & Tanggal */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="font-semibold text-ochi-dark text-sm md:text-base line-clamp-2 group-hover:text-ochi-primary transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-xs text-ochi-dark/50 mt-3 flex items-center gap-1">
                      <span>🗓️</span> {publishDate}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}