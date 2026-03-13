"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3DScene } from "./hero-3d-scene";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
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
                50.000+ người Hà Nội tin dùng
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
            >
              Ăn Ngon An Toàn tại{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Hà Nội
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Khám phá các nhà hàng và quán ăn đường phố được chứng nhận an toàn
              trên toàn thành phố. Nền tảng tin cậy về an toàn thực phẩm.
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
                Khám phá nhà hàng an toàn
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border hover:bg-muted text-foreground"
              >
                <MapPin className="mr-2 w-4 h-4" />
                Xem bản đồ thực phẩm
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              {[
                { value: "2.500+", label: "Địa điểm chứng nhận" },
                { value: "12", label: "Quận/Huyện" },
                { value: "99,2%", label: "Độ chính xác" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
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
                  🍜
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
                    Chứng nhận an toàn
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
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
