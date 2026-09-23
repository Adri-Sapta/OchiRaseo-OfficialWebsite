'use client';

import { motion } from 'framer-motion';

export default function Data() {
  // Data Profil Tanpa Goals
  const profileDetails = [
    { label: 'Title', value: 'Kurir Hoki Idaman' },
    { label: 'Birthday', value: '21 December' },
    { label: 'Height / Weight', value: '150 cm / 42 kg' },
    { label: 'Age', value: 'Legal bro' },
    { label: 'Debut Stream', value: '25 Juni 2025' },
    { label: 'Oshi Mark', value: '🍀' },
    { label: 'Catchphrase', value: 'HOKY HOKY HOKYAAA' },
    { label: 'Likes', value: 'Levi Ackerman (my man 💖), Anime, Singing, Music, Gaming' },
    {
      label: 'Dislikes',
      value: 'Matcha (pait 🍵), Kecoa (NOPE.), Math (alergi angka ❌), Spicy Food, Horror Games',
    },
  ];

  // Data Goals Dipisah Menjadi Array Target
  const goalsList = [
    { title: 'Collab Ramai-ramai', icon: '🤝', category: 'Community' },
    { title: 'Subscriber Milestones (10K → 100K → 1M → 100M)', icon: '🎯', category: 'Milestone' },
    { title: 'Rilis Original Song', icon: '🎵', category: 'Music' },
    { title: 'Debut 3D Model', icon: '✨', category: 'Content' },
    { title: 'Married to Levi Ackerman', icon: '💍', category: 'Dream' },
    { title: 'Travel Around the World', icon: '✈️', category: 'Life' },
    { title: 'New WiFi (Biar Ga Ngelag!)', icon: '📶', category: 'Setup' },
  ];

  return (
    <section id="data" className="py-16 bg-gradient-to-b from-white to-[#f7faf7]">
      <div className="max-w-4xl mx-auto px-6">
        {/* SECTION TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-ochi-dark tracking-wide uppercase">
            OCHI RASEO DATA 📊
          </h2>
          <p className="text-xs md:text-sm text-ochi-dark/60 mt-1">
            Yuk Lebih Dekat Dengan Mengenal Ochi Rasheo
          </p>
        </div>

        {/* 1. TABEL PROFIL UTAMA (Bersih dari Goals) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-ochi-light/80 shadow-sm overflow-hidden mb-12"
        >
          <div className="divide-y divide-ochi-light/40">
            {profileDetails.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-3 p-4 md:px-6 hover:bg-[#f7faf7]/50 transition duration-150"
              >
                <div className="font-bold text-sm text-ochi-dark flex items-center">{item.label}</div>
                <div className="md:col-span-2 text-sm text-ochi-dark/80 mt-1 md:mt-0 font-medium">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. DEDICATED GOALS & TARGETS SECTION */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-bold text-ochi-dark flex items-center gap-2">
              <span>🎯</span> Ochi&apos;s Dreams & Goals
            </h3>
            <span className="text-xs font-semibold px-3 py-1 bg-ochi-primary/10 text-ochi-primary rounded-full">
              {goalsList.length} Targets
            </span>
          </div>

          {/* GRID CARD GOALS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goalsList.map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-4 rounded-xl border border-ochi-light/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl p-2 bg-[#f7faf7] rounded-lg border border-ochi-light/40">
                    {goal.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ochi-primary bg-ochi-primary/10 px-2 py-0.5 rounded-md">
                    {goal.category}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs md:text-sm font-bold text-ochi-dark leading-snug">
                    {goal.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}