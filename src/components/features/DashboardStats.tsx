"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Leaf,
  Award,
  TrendingDown,
  Target,
  Sparkles,
} from "lucide-react";

/* =========================================================
   ANIMATED COUNTER
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      start = value * eased;
      setDisplay(start);
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
   STAT CARD — dengan 3D tilt
========================================================= */
function StatCard({ item, index }: { item: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values untuk tilt
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateY.set(((x - centerX) / centerX) * 8);
    rotateX.set(((centerY - y) / centerY) * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = item.icon;
  const isBadge = item.variant === "badge";
  const isTrend = item.variant === "trend";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(34,197,94,0.15)]"
      >
        {/* Hover gradient overlay */}
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${item.glow}`}
        />

        {/* Shine sweep untuk badge */}
        {isBadge && (
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "250%" }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        )}

        {/* Sparkline untuk trend */}
        {isTrend && (
          <svg
            className="pointer-events-none absolute bottom-0 left-0 w-full h-12 opacity-30"
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,35 L30,28 L60,30 L90,20 L120,22 L150,12 L200,5"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </svg>
        )}

        <div className="relative flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-800">
              {item.value}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {item.subtitle}
            </p>
          </div>

          {/* Icon dengan animasi */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative rounded-xl p-4 ${item.color} flex-shrink-0`}
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              className={`absolute inset-0 rounded-xl ${item.ring}`}
            />

            {isBadge ? (
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Icon size={28} />
              </motion.div>
            ) : isTrend ? (
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Icon size={28} />
              </motion.div>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <Icon size={28} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Progress bar mini untuk beberapa card */}
        {item.progress !== undefined && (
          <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 + index * 0.1 }}
              className={`h-full rounded-full ${item.progressColor}`}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function DashboardStats() {
  const stats = [
    {
      title: "Total Emission",
      value: <AnimatedCounter value={245} suffix=" kg" />,
      subtitle: "CO₂ / month",
      icon: Leaf,
      color: "bg-green-100 text-green-600",
      ring: "bg-green-400/40",
      glow:
        "bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_60%)]",
      progress: 62,
      progressColor: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
    {
      title: "Green Score",
      value: <AnimatedCounter value={82} suffix="" />,
      subtitle: "/100 · Excellent",
      icon: Target,
      color: "bg-emerald-100 text-emerald-600",
      ring: "bg-emerald-400/40",
      glow:
        "bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_60%)]",
      progress: 82,
      progressColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
    },
    {
      title: "Current Badge",
      value: (
        <span className="inline-flex items-center gap-2">
          Gold
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </span>
      ),
      subtitle: "Eco Champion",
      icon: Award,
      color: "bg-yellow-100 text-yellow-600",
      ring: "bg-yellow-400/40",
      glow:
        "bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_60%)]",
      variant: "badge",
    },
    {
      title: "Reduction",
      value: (
        <span className="text-blue-600">
          <AnimatedCounter value={15} suffix="%" />
        </span>
      ),
      subtitle: "vs last month",
      icon: TrendingDown,
      color: "bg-blue-100 text-blue-600",
      ring: "bg-blue-400/40",
      glow:
        "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_60%)]",
      variant: "trend",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => (
        <StatCard key={index} item={item} index={index} />
      ))}
    </section>
  );
}