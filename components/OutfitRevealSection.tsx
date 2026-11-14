"use client";

import { useState, useEffect } from "react";

interface TrailerItem {
  id: string;
  label: string;
  title: string;
}

const TRAILERS: TrailerItem[] = [
  {
    id: "q35h7F9yiCg",
    label: "Teaser #1: Body",
    title: "Ochi Rasheo New Outfit Teaser 01",
  },
  {
    id: "zVxeZwBbrHw",
    label: "Teaser #2: Head",
    title: "Ochi Rasheo New Outfit Teaser 02",
  },
];

const STREAM_URL = "https://www.youtube.com/watch?v=BuosCkZMP8A";

export default function OutfitRevealSection() {
  // Target waktu: Sabtu, 21 November 2026 pukul 20:00 WIB (UTC+7)
  const targetDate = new Date("2026-11-21T20:00:00+07:00").getTime();

  const [activeTrailer, setActiveTrailer] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Link otomatis simpan pengingat ke Google Calendar (20:00 WIB = 13:00 UTC)
  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" +
    encodeURIComponent("🍀 Ochi Rasheo - New Costume & Re-Debut Stream!") +
    "&dates=20261121T130000Z/20261121T150000Z" +
    "&details=" +
    encodeURIComponent(
      `Jangan sampai ketinggalan reveal kostum baru & Re-Debut Ochi Rasheo! Tonton langsung di: ${STREAM_URL}`
    );

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="bg-white/90 backdrop-blur-sm border border-emerald-200 rounded-3xl shadow-sm p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Kolom Kiri: Info Event & Countdown */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-700">
              🍀 Special Re-Debut &amp; New Costume
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
              NEW COSTUME REVEAL
            </h2>

            <p className="text-gray-600 text-sm md:text-base max-w-lg leading-relaxed">
              Siap-siap menyambut tampilan baru Ochi Rasheo! Intip kedua
              siluet trailernya dan nyalakan notifikasi waiting room sebelum
              stream dimulai.
            </p>

            {/* Jadwal Tayang */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-medium text-emerald-800 bg-emerald-50/80 px-4 py-2.5 rounded-2xl border border-emerald-100">
              <span>📅 Sabtu, 21 November 2026</span>
              <span className="hidden sm:inline">•</span>
              <span>🕗 20.00 WIB</span>
            </div>

            {/* Kotak Countdown atau Status Live */}
            {!mounted ? (
              <div className="h-24 w-full max-w-md bg-emerald-50/50 animate-pulse rounded-2xl" />
            ) : isLive ? (
              <div className="w-full p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600" />
                  </span>
                  <span className="font-bold text-rose-700 text-base md:text-lg">
                    STREAM SEDANG BERLANGSUNG!
                  </span>
                </div>
                <a
                  href={STREAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition shadow-sm"
                >
                  Tonton Sekarang
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md pt-1">
                {[
                  { label: "Hari", value: timeLeft.days },
                  { label: "Jam", value: timeLeft.hours },
                  { label: "Menit", value: timeLeft.minutes },
                  { label: "Detik", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center bg-emerald-50/90 border border-emerald-200/80 rounded-2xl py-3.5 px-2"
                  >
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={STREAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition shadow-sm"
              >
                🔔 Buka Waiting Room
              </a>
              {!isLive && (
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold transition"
                >
                  + Pengingat Kalender
                </a>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Switcher & Embed 2 YouTube Shorts Trailer (9:16) */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-3">
            {/* Tombol Tab Pilih Trailer */}
            <div className="inline-flex p-1 rounded-full bg-emerald-50 border border-emerald-200/80">
              {TRAILERS.map((trailer, index) => (
                <button
                  key={trailer.id}
                  type="button"
                  onClick={() => setActiveTrailer(index)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeTrailer === index
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "text-emerald-700 hover:text-emerald-900"
                  }`}
                >
                  {trailer.label}
                </button>
              ))}
            </div>

            {/* Frame Shorts 9:16 */}
            <div className="w-full max-w-[260px] sm:max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-md border-4 border-emerald-100 bg-black">
              <iframe
                key={TRAILERS[activeTrailer].id}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${TRAILERS[activeTrailer].id}?rel=0`}
                title={TRAILERS[activeTrailer].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <span className="text-xs text-gray-400">
              {TRAILERS[activeTrailer].title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}