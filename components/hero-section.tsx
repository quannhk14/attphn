"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Shield, ClipboardCheck, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3DScene } from "./hero-3d-scene";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  bgColor: string;
  glowColor: string;
}

const stats: Stat[] = [
  {
    icon: Shield,
    value: 2547,
    label: "Nhà hàng chứng nhận",
    color: "text-primary",
    bgColor: "bg-primary/10",
    glowColor: "shadow-primary/20",
  },
  {
    icon: ClipboardCheck,
    value: 856,
    label: "Kiểm tra trong tháng",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    glowColor: "shadow-chart-3/20",
  },
  {
    icon: AlertTriangle,
    value: 47,
    label: "Vi phạm phát hiện",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    glowColor: "shadow-destructive/20",
  },
  {
    icon: MapPin,
    value: 12,
    label: "Quận/Huyện",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
    glowColor: "shadow-secondary/20",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function FloatingStatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;
  
  // Stable positions based on index
  const positions = [
    { x: 0, y: 0 },
    { x: 5, y: 3 },
    { x: -3, y: 5 },
    { x: 2, y: -2 },
  ];
  
  const pos = positions[index % positions.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.6, type: "spring" }}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-default"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl ${stat.bgColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      
      {/* Card */}
      <motion.div 
        className={`relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-5 shadow-xl ${stat.glowColor} hover:shadow-2xl hover:border-border transition-all duration-300`}
        animate={{
          y: [pos.y, pos.y + 6, pos.y],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <motion.div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shrink-0`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
          </motion.div>

          <div>
            {/* Value with counter */}
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>

            {/* Label */}
            <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              {stat.label}
            </div>
          </div>
        </div>

        {/* Trend indicator */}
        <motion.div 
          className="mt-2 flex items-center gap-1 text-xs text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + index * 0.1 }}
        >
          <TrendingUp className="w-3 h-3" />
          <span>+12%</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 hidden lg:block">
        <Hero3DScene />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                50.000+ nguoi Ha Noi tin dung
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
            >
              An Ngon An Toan tai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Ha Noi
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Kham pha cac nha hang va quan an duong pho duoc chung nhan an toan
              tren toan thanh pho. Nen tang tin cay ve an toan thuc pham.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Kham pha nha hang an toan
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border hover:bg-muted text-foreground"
              >
                <MapPin className="mr-2 w-4 h-4" />
                Xem ban do thuc pham
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Mobile Map Preview */}
          <div className="lg:hidden relative h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 rounded-3xl border border-border/50 backdrop-blur-sm overflow-hidden">
              {/* Mobile stylized map */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
                  <path
                    d="M100,20 Q130,30 150,60 Q170,100 160,140 Q145,175 100,180 Q55,175 40,140 Q30,100 50,60 Q70,30 100,20"
                    fill="currentColor"
                    fillOpacity="0.1"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                  <ellipse cx="100" cy="100" rx="15" ry="20" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>
              
              {/* Mobile floating food icons */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {"🍜"}
                </motion.div>
                <div className="flex justify-center gap-3 mb-4">
                  {["🥢", "🍲", "🥟", "☕", "🍱"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [0, -12, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      className="text-3xl drop-shadow-lg"
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-sm font-medium">
                    Chung nhan an toan
                  </span>
                </motion.div>
              </div>
              
              {/* Animated pins */}
              {[
                { x: 25, y: 30 },
                { x: 70, y: 25 },
                { x: 60, y: 65 },
                { x: 35, y: 70 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Statistics Cards - Integrated into Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 lg:mt-24"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Thong ke truc tiep</span>
            <div className="h-px w-12 bg-border" />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <FloatingStatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Du lieu cap nhat lien tuc</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
