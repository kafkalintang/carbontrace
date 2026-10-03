"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Leaf, Calculator, Award, Brain, TrendingUp,
  ShieldCheck, Zap, ChevronDown, Quote, Factory, Truck,
  Lightbulb, Recycle, Globe2, CheckCircle2,
} from "lucide-react";

/* ---------- 3D FLOATING ORB ---------- */
function FloatingOrb() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #22c55e, #06b6d4, #a3e635, #22c55e)",
          filter: "blur(60px)",
          transformStyle: "preserve-3d",
        }}
      />
      <motion.div
        animate={{ rotateX: 360, rotateZ: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 h-52 w-52 rounded-full"
        style={{
          background:
            "conic-gradient(from 90deg, #10b981, #14b8a6, #84cc16)",
          filter: "blur(70px)",
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}

/* ---------- ANIMATED COUNTER ---------- */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

/* ---------- SCROLL REVEAL WRAPPER ---------- */
function Reveal({ children, delay = 0, y = 40 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Cursor parallax di hero
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* ------- DATA ------- */
  const features = [
    {
      icon: Calculator,
      title: "Hitung Jejak Karbon",
      desc: "Upload tagihan listrik dan data operasional usaha. AI kami menghitung emisi Scope 1, 2, dan 3 secara otomatis dalam hitungan menit.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Brain,
      title: "Analisis AI Cerdas",
      desc: "Dapatkan rekomendasi personal untuk menurunkan emisi — mulai dari penggantian lampu, optimasi logistik, hingga efisiensi produksi.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Award,
      title: "Green Badge Terverifikasi",
      desc: "Tampilkan komitmen lingkungan dengan badge digital + QR code yang bisa dipindai pelanggan, investor, dan mitra bisnis Anda.",
      color: "from-lime-500 to-green-500",
    },
  ];

  const steps = [
    {
      icon: Factory,
      step: "01",
      title: "Daftar & Input Data Usaha",
      desc: "Cukup daftar gratis dan masukkan data operasional UMKM Anda — tagihan listrik, bahan bakar, atau aktivitas produksi.",
    },
    {
      icon: Brain,
      step: "02",
      title: "AI Hitung & Analisis",
      desc: "AI kami memproses data dan menghitung emisi karbon Anda menggunakan standar GHG Protocol yang diakui internasional.",
    },
    {
      icon: Award,
      step: "03",
      title: "Dapatkan Badge & Rekomendasi",
      desc: "Terima Green Badge digital dan roadmap pengurangan emisi untuk perjalanan bisnis berkelanjutan Anda.",
    },
  ];

  const testimonials = [
    {
      name: "Bu Sari",
      business: "Kopi Nusantara, Bandung",
      text: "Awalnya saya tidak tahu sama sekali soal karbon. Setelah pakai CarbonTrace, saya tahu cara hemat listrik dan sekarang punya badge hijau yang bikin pelanggan percaya!",
    },
    {
      name: "Pak Andi",
      business: "Toko Roti Sejahtera, Surabaya",
      text: "Fitur analisis AI-nya luar biasa. Saya bisa turunkan emisi 22% hanya dengan ganti peralatan pendingin. Hemat biaya juga!",
    },
    {
      name: "Mbak Rina",
      business: "Batik Lestari, Solo",
      text: "Badge hijau CarbonTrace membantu kami masuk ke pasar ekspor. Pembeli Eropa sekarang sangat peduli sustainability.",
    },
  ];

  const faqs = [
    {
      q: "Apa itu jejak karbon dan kenapa UMKM perlu tahu?",
      a: "Jejak karbon adalah total gas rumah kaca (terutama CO₂) yang dihasilkan dari aktivitas bisnis Anda. UMKM perlu tahu karena: (1) regulasi makin ketat, (2) pelanggan makin peduli lingkungan, (3) menghemat biaya operasional, dan (4) membuka peluang pasar ekspor & pendanaan hijau.",
    },
    {
      q: "Apakah CarbonTrace gratis?",
      a: "Ya! Paket dasar CarbonTrace gratis untuk UMKM. Anda bisa menghitung emisi, mendapat rekomendasi dasar, dan Green Badge tanpa biaya. Paket premium tersedia untuk fitur lanjutan seperti laporan ESG & integrasi API.",
    },
    {
      q: "Bagaimana AI menghitung emisi saya?",
      a: "AI kami menggunakan standar GHG Protocol (Scope 1, 2, 3) dengan faktor emisi resmi dari KLHK dan IPCC. Anda cukup upload data (foto tagihan, Excel, atau input manual) dan AI akan mengonversi ke satuan ton CO₂e.",
    },
    {
      q: "Apakah data saya aman?",
      a: "Tentu. Semua data dienkripsi end-to-end dan hanya Anda yang bisa mengaksesnya. Kami tidak pernah menjual data ke pihak ketiga.",
    },
    {
      q: "Berapa lama proses perhitungan?",
      a: "Hanya 2–5 menit setelah data diupload. Untuk analisis mendalam dengan laporan lengkap, butuh sekitar 24 jam kerja.",
    },
  ];

  return (
    <main className="overflow-hidden bg-white">
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 40,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 40,
          });
        }}
      >
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green-400/25 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-lime-400/20 blur-[120px]" />

        {/* 3D Floating Orb */}
        <FloatingOrb />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative mx-auto max-w-7xl px-6 py-24 w-full"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 backdrop-blur-xl px-4 py-2 shadow-sm mb-6"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Globe2 className="h-4 w-4 text-green-600" />
                </motion.div>
                <span className="text-sm font-medium text-green-700">
                  AI Powered Carbon Management
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
                Kelola
                <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Jejak Karbon
                </span>
                UMKM Indonesia
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl">
                Platform AI pertama di Indonesia yang membantu UMKM
                <span className="font-semibold text-gray-800"> menghitung, memonitor, dan mengurangi </span>
                emisi karbon — mudah, akurat, dan gratis untuk memulai.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/calculator">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 text-white font-semibold shadow-xl shadow-green-300/40 cursor-pointer"
                  >
                    Mulai Hitung Gratis
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </motion.div>
                </Link>

                <Link href="/demo">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl px-8 py-4 font-semibold text-gray-700 hover:bg-white cursor-pointer"
                  >
                    Lihat Demo
                  </motion.div>
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                {[
                  { icon: ShieldCheck, text: "Terverifikasi GHG Protocol" },
                  { icon: Zap, text: "Analisis Instan" },
                  { icon: Leaf, text: "Ramah Lingkungan" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="h-5 w-5 text-green-600" />
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Dashboard 3D */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative"
              style={{
                transform: `perspective(1200px) rotateY(${-mouse.x * 0.3}deg) rotateX(${mouse.y * 0.3}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 right-0 z-20 rounded-2xl bg-white p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">AI Insight</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Potensi hemat energi 22%
                </p>
              </motion.div>

              <div className="rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-2xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-500">Carbon Dashboard</p>
                    <h3 className="text-2xl font-bold">CarbonTrace</h3>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Green Badge
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Progress Net Zero</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-green-50 p-5">
                      <p className="text-sm text-gray-500">Emisi Bulan Ini</p>
                      <h4 className="text-3xl font-bold mt-2">1.2T</h4>
                      <p className="text-xs text-green-600 mt-1">↓ 18% vs bulan lalu</p>
                    </div>
                    <div className="rounded-2xl bg-cyan-50 p-5">
                      <p className="text-sm text-gray-500">Kredit Hijau</p>
                      <h4 className="text-3xl font-bold mt-2">240</h4>
                      <p className="text-xs text-cyan-600 mt-1">poin terkumpul</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-5 text-white">
                    <p className="text-sm opacity-90">AI Recommendation</p>
                    <h4 className="text-lg font-semibold mt-2">
                      Ganti lampu ke LED untuk menurunkan emisi hingga 15%
                    </h4>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-5 py-4 shadow-xl"
              >
                🏆 Verified Green Business
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: "+", label: "UMKM Terdaftar" },
              { value: 10, suffix: "K+ Ton", label: "CO₂ Terlacak" },
              { value: 95, suffix: "%", label: "Akurasi AI" },
              { value: 2060, suffix: "", label: "Target Net Zero" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="mt-2 text-gray-500">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EDUKASI: APA ITU JEJAK KARBON ============ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <span className="font-semibold text-green-600 text-sm tracking-wider">
                  EDUKASI
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                  Apa Itu{" "}
                  <span className="bg-gradient-to-r from-green-600 to-cyan-500 bg-clip-text text-transparent">
                    Jejak Karbon?
                  </span>
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  Jejak karbon adalah total emisi gas rumah kaca — terutama
                  karbon dioksida (CO₂) — yang dihasilkan dari aktivitas
                  manusia atau bisnis. Semakin tinggi jejak karbon, semakin
                  besar kontribusi terhadap perubahan iklim.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  Untuk UMKM, jejak karbon berasal dari:
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    { icon: Zap, text: "Penggunaan listrik (lampu, AC, mesin)" },
                    { icon: Truck, text: "Transportasi & distribusi produk" },
                    { icon: Factory, text: "Proses produksi & bahan baku" },
                    { icon: Recycle, text: "Pengelolaan limbah & kemasan" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 rounded-xl bg-green-50/60 p-3"
                    >
                      <div className="rounded-lg bg-green-100 p-2">
                        <item.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Ilustrasi 3D karbon */}
            <Reveal delay={0.2}>
              <div
                className="relative h-[500px] flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative h-80 w-80"
                >
                  {/* Orbital rings */}
                  {[0, 60, 120].map((rot, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-green-300/60"
                      style={{
                        transform: `rotateY(${rot}deg) rotateX(${rot / 2}deg)`,
                      }}
                    />
                  ))}

                  {/* Center earth */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 60px rgba(34,197,94,0.5)",
                          "0 0 100px rgba(6,182,212,0.7)",
                          "0 0 60px rgba(34,197,94,0.5)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-40 w-40 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-cyan-500 flex items-center justify-center"
                    >
                      <Leaf className="h-20 w-20 text-white" />
                    </motion.div>
                  </div>

                  {/* Orbiting particles */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="absolute h-4 w-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) translateX(${150 + i * 20}px)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Floating labels */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-10 right-10 rounded-2xl bg-white px-4 py-3 shadow-xl"
                >
                  <p className="text-xs text-gray-500">Scope 1</p>
                  <p className="font-bold text-gray-800">Emisi Langsung</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-10 left-10 rounded-2xl bg-white px-4 py-3 shadow-xl"
                >
                  <p className="text-xs text-gray-500">Scope 2</p>
                  <p className="font-bold text-gray-800">Energi Tidak Langsung</p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-24 bg-gradient-to-b from-green-50/30 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-semibold text-green-600 text-sm tracking-wider">
                FITUR UNGGULAN
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Semua yang Dibutuhkan UMKM
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Kelola jejak karbon bisnis dengan teknologi AI yang sederhana,
                akurat, dan terjangkau.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Reveal key={idx} delay={idx * 0.15}>
                  <motion.div
                    whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white/80 backdrop-blur-xl p-8 shadow-sm hover:shadow-[0_30px_80px_rgba(34,197,94,0.20)] h-full"
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${feature.color}/5`} />
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-4 shadow-lg`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-semibold text-green-600 text-sm tracking-wider">
                CARA KERJA
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Hanya 3 Langkah Mudah
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Tidak perlu keahlian teknis. Tidak perlu konsultan mahal.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400" />

            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="relative text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl ring-4 ring-green-100"
                  >
                    <step.icon className="h-10 w-10 text-green-600" />
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-xs font-bold text-white shadow-lg">
                      {step.step}
                    </span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-semibold text-green-600 text-sm tracking-wider">
                TESTIMONI
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Dipercaya UMKM Indonesia
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full rounded-3xl border border-green-100 bg-gradient-to-br from-white to-green-50/40 p-8 shadow-sm hover:shadow-xl transition"
                >
                  <Quote className="h-8 w-8 text-green-500 mb-4" />
                  <p className="text-gray-700 leading-relaxed italic">
                    "{t.text}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-green-100 pt-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {t.name.charAt(t.name.indexOf(" ") + 1)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.business}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50/40">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-semibold text-green-600 text-sm tracking-wider">
                FAQ
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Pertanyaan Umum
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-green-50/50 transition"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-green-600 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_40%)]" />

        {/* Animated 3D shapes */}
        <motion.div
          animate={{ rotate: 360, x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 h-32 w-32 rounded-3xl bg-white/10 backdrop-blur"
        />
        <motion.div
          animate={{ rotate: -360, y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/10 backdrop-blur"
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Leaf className="mx-auto h-14 w-14 mb-6" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black">
            Siap Jadi UMKM Hijau?
          </h2>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Bergabung dengan 500+ UMKM Indonesia yang sudah memulai
            perjalanan menuju bisnis berkelanjutan. Gratis, tanpa kartu kredit.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-green-600 shadow-2xl cursor-pointer"
              >
                Daftar Gratis Sekarang
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/60 px-8 py-4 font-bold text-white hover:bg-white/10 cursor-pointer"
              >
                Konsultasi Dulu
              </motion.div>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/80">
            {["Gratis 100%", "Tanpa kartu kredit", "Setup 5 menit"].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}