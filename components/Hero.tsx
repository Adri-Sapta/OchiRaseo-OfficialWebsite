'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        
        {/* Gambar Profil Ochi Avatar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex-shrink-0"
        >
          <Image
            src="/ochi-avatar.png"
            alt="Ochi Rasheo Profile"
            fill
            sizes="(max-width: 768px) 256px, 320px"
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Informasi / Bio Ochi Rasheo */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg"
        >
          <span className="bg-ochi-light text-ochi-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            KURIR HOKI IDAMAN
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-ochi-dark tracking-tight">
            Ochi Rasheo
          </h1>

          <p className="text-ochi-primary font-bold text-lg md:text-xl mt-1 mb-4 flex items-center gap-1">
            HOKY HOKY HOKYAAA 🍀
          </p>

          <p className="text-ochi-dark/70 text-sm md:text-base leading-relaxed mb-6">
            Dari negeri Clovisia di langit sana, Ochi dulunya semanggi empat daun yang berubah jadi cewek ceria pembawa hoki! Dikirim ke bumi buat jadi kurir hoki buat kalian semua lewat tawa, cerita, dan vibes positif! ✨
          </p>

          {/* Tombol Media Sosial */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href="https://www.youtube.com/@Ochirasheo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8ec396] hover:bg-ochi-primary text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition shadow-sm"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@ochirasheo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e9f3eb] hover:bg-ochi-light text-ochi-dark text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition"
            >
              TikTok
            </a>
            <a
              href="https://www.instagram.com/ochirasheo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e9f3eb] hover:bg-ochi-light text-ochi-dark text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition"
            >
              Instagram
            </a>
            <a
              href="https://x.com/ochirasheo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e9f3eb] hover:bg-ochi-light text-ochi-dark text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition"
            >
              X (Twitter)
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}