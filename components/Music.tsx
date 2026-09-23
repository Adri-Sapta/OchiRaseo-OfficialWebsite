'use client';

import { motion } from 'framer-motion';

export default function Music() {
  const musicList = [
    {
      title: "初恋 - Kobo Kanaeru (Cover by Ochi Rasheo)",
      thumbnail: "https://i.ytimg.com/vi/QsHk_oal34A/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=QsHk_oal34A",
    },
    {
      title: "I Like You So Much, You'll Know It - Ysabelle (Cover by Ochi Rasheo)",
      thumbnail: "https://i.ytimg.com/vi/vIrwrPanRCU/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=vIrwrPanRCU",
    },
    {
      title: "ぎゅっと。(Gyutto.) / もさを。(Cover by Ochi Rasheo)",
      thumbnail: "https://i.ytimg.com/vi/CXm2HaanIF0/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=CXm2HaanIF0",
    },
    {
      title: "Stay with me - Miki Matsubara (Cover by Ochi Rasheo)",
      thumbnail: "https://i.ytimg.com/vi/a-2M_WOnaa8/hqdefault.jpg", // Diubah ke hqdefault agar tidak rawan error 404
      url: "https://www.youtube.com/watch?v=a-2M_WOnaa8",
    },
    {
      title: "When I'm Gone - Anna Kendrick (Ochi Rasheo Cover)",
      thumbnail: "https://i.ytimg.com/vi/ylHavGAtPso/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=ylHavGAtPso",
    },
  ];

  return (
    <section id="music" className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-center text-ochi-primary tracking-widest mb-8"
      >
        MUSIC & COVER
      </motion.h2>

      {/* Grid Kartu Lagu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {musicList.map((song, idx) => (
          <motion.a 
            key={idx}
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-ochi-light hover:shadow-md transition flex flex-col"
          >
            {/* Display Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-ochi-light/40">
              <img 
                src={song.thumbnail} 
                alt={song.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-3xl">▶</span>
              </div>
            </div>

            {/* Informasi Judul Lagu */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="font-bold text-ochi-dark text-sm md:text-base line-clamp-2 group-hover:text-ochi-primary transition">
                {song.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}