"use client";

import { useRef, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  TrendingDown,
  Sparkles,
  Info,
  Target,
  ArrowDownRight,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */
const emissionData = [
  { month: "Jan", emission: 320, target: 300 },
  { month: "Feb", emission: 295, target: 300 },
  { month: "Mar", emission: 280, target: 300 },
  { month: "Apr", emission: 250, target: 260 },
  { month: "May", emission: 235, target: 260 },
  { month: "Jun", emission: 210, target: 220 },
];

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const emission = payload[0].value;
  const prevIndex = emissionData.findIndex((d) => d.month === label) - 1;
  const prev = prevIndex >= 0 ? emissionData[prevIndex].emission : null;
  const diff = prev ? ((emission - prev) / prev) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-2xl border border-green-100 bg-white/95 p-4 shadow-2xl backdrop-blur-xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label} 2024
      </p>
      <p className="mt-1 text-2xl font-bold text-gray-800">
        {emission}
        <span className="ml-1 text-sm font-medium text-gray-500">kg CO₂</span>
      </p>
      {prev !== null && (
        <div
          className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            diff < 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {diff < 0 ? (
            <ArrowDownRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3 rotate-180" />
          )}
          {Math.abs(diff).toFixed(1)}% vs bulan lalu
        </div>
      )}
    </motion.div>
  );
}

/* =========================================================
   ANIMATED COUNTER (reusable)
========================================================= */
function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function EmissionChart() {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  const totalReduction =
    ((emissionData[0].emission - emissionData[emissionData.length - 1].emission) /
      emissionData[0].emission) *
    100;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-[0_20px_60px_rgba(34,197,94,0.15)]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.06),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* ===== HEADER ===== */}
      <div className="relative mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 p-3 shadow-sm"
          >
            <BarChart3 className="text-green-600" size={24} />
          </motion.div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Carbon Emission Trend
            </h2>
            <p className="text-sm text-gray-500">
              Monthly carbon footprint monitoring
            </p>
          </div>
        </div>

        {/* Trend badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5"
        >
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <TrendingDown className="h-4 w-4 text-green-600" />
          </motion.div>
          <span className="text-sm font-semibold text-green-700">
            <AnimatedCounter value={totalReduction} decimals={1} suffix="%" /> turun
          </span>
        </motion.div>
      </div>

      {/* ===== CHART ===== */}
      <div className="relative h-80">
        {/* Animated draw-in wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={emissionData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                {/* Gradient untuk area */}
                <linearGradient id="emissionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
                  <stop offset="50%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>

                {/* Gradient untuk stroke */}
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e5e7eb"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                dy={10}
              />

              <YAxis
                unit=" kg"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                width={60}
              />

              {/* Reference line target */}
              <ReferenceLine
                y={220}
                stroke="#06b6d4"
                strokeDasharray="5 5"
                strokeWidth={1.5}
                label={{
                  value: "🎯 Target 220kg",
                  position: "insideTopRight",
                  fill: "#0891b2",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#22c55e",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="emission"
                stroke="url(#strokeGradient)"
                strokeWidth={3}
                fill="url(#emissionGradient)"
                filter="url(#glow)"
                dot={{
                  r: 5,
                  fill: "#fff",
                  stroke: "#22c55e",
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 8,
                  fill: "#22c55e",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
                animationDuration={1800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pulse dot di titik terakhir */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.4 }}
          className="pointer-events-none absolute right-4 top-12"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
        </motion.div>
      </div>

      {/* ===== AI INSIGHT (pengganti summary) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative mt-6 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-emerald-50/50 to-cyan-50/30 p-5"
      >
        {/* Sparkle decoration */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute -right-4 -top-4 text-green-300/40"
        >
          <Sparkles className="h-20 w-20" />
        </motion.div>

        <div className="relative flex items-start gap-3">
          <div className="rounded-lg bg-white p-2 shadow-sm">
            <Sparkles className="h-5 w-5 text-green-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-800">AI Insight</h3>
              <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Beta
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Emisi karbon Anda turun{" "}
              <span className="font-bold text-green-700">
                <AnimatedCounter value={totalReduction} decimals={1} suffix="%" />
              </span>{" "}
              dalam 6 bulan terakhir —{" "}
              <span className="font-semibold text-gray-800">
                konsisten di bawah target
              </span>
              . Pertahankan dengan fokus pada efisiensi listrik dan logistik.
            </p>

            {/* Mini stat row */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                {
                  label: "Awal",
                  value: emissionData[0].emission,
                  suffix: " kg",
                  color: "text-gray-500",
                },
                {
                  label: "Sekarang",
                  value: emissionData[emissionData.length - 1].emission,
                  suffix: " kg",
                  color: "text-green-600",
                },
                {
                  label: "Target",
                  value: 220,
                  suffix: " kg",
                  color: "text-cyan-600",
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="rounded-xl bg-white/80 p-3 backdrop-blur-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {s.label}
                  </p>
                  <p className={`mt-1 text-sm font-bold ${s.color}`}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Progress to target */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-gray-500">
                  <Target className="h-3 w-3" />
                  Progress ke target
                </span>
                <span className="font-bold text-gray-700">
                  <AnimatedCounter
                    value={
                      ((emissionData[0].emission -
                        emissionData[emissionData.length - 1].emission) /
                        (emissionData[0].emission - 220)) *
                      100
                    }
                    suffix="%"
                  />
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/70">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "55%" } : {}}
                  transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer note */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <Info className="h-3 w-3" />
        <span>Data diperbarui otomatis setiap awal bulan</span>
      </div>
    </motion.div>
  );
}