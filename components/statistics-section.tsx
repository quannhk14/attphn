"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  ClipboardCheck,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const stats: Stat[] = [
  {
    icon: Shield,
    value: 2547,
    label: "Nhà hàng chứng nhận",
    description: "Đạt tất cả kiểm tra an toàn",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ClipboardCheck,
    value: 856,
    label: "Kiểm tra trong tháng",
    description: "Giám sát tích cực các quận",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: AlertTriangle,
    value: 47,
    label: "Vi phạm phát hiện",
    description: "Đang điều tra hoặc đã xử lý",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: MapPin,
    value: 12,
    label: "Quận/Huyện",
    description: "Phủ sóng toàn thành phố",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
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

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
        {/* Background glow */}
        <div
          className={`absolute inset-0 rounded-2xl ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center mb-5`}
          >
            <Icon className={`w-7 h-7 ${stat.color}`} />
          </div>

          {/* Value */}
          <div className="text-4xl sm:text-5xl font-bold text-foreground">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>

          {/* Label */}
          <div className="mt-2 text-lg font-medium text-foreground">
            {stat.label}
          </div>

          {/* Description */}
          <div className="mt-1 text-sm text-muted-foreground">
            {stat.description}
          </div>

          {/* Trend indicator */}
          <div className="mt-4 flex items-center gap-1 text-sm text-primary">
            <TrendingUp className="w-4 h-4" />
            <span>+12% so với tháng trước</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StatisticsSection() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Thống kê trực tiếp
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Tổng quan an toàn thực phẩm
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Dữ liệu thời gian thực từ hệ thống giám sát an toàn thực phẩm toàn thành phố
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-muted/50 to-secondary/5 border border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">
                  Tham gia cùng 50.000+ người dân
                </div>
                <div className="text-sm text-muted-foreground">
                  Sử dụng nền tảng để ăn uống an toàn tại Hà Nội
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Cập nhật lần cuối:
              </span>
              <span className="text-sm font-medium text-foreground">
                Vừa xong
              </span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
