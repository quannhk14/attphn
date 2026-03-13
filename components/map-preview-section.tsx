"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin as MapPinIcon, ArrowRight, Shield, AlertTriangle, Clock, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StylizedHanoiMap } from "./stylized-hanoi-map";

const mapPins = [
  {
    id: 1,
    x: 30,
    y: 32,
    status: "safe",
    name: "Phở 10 Lý Quốc Sư",
    district: "Hoàn Kiếm",
    rating: 4.8,
    lastInspection: "Tháng 3/2026",
  },
  {
    id: 2,
    x: 50,
    y: 28,
    status: "safe",
    name: "Bún Chả Hương Liên",
    district: "Hai Bà Trưng",
    rating: 4.9,
    lastInspection: "Tháng 2/2026",
  },
  {
    id: 3,
    x: 65,
    y: 45,
    status: "violation",
    name: "Quán ăn góc phố",
    district: "Đống Đa",
    rating: 3.2,
    lastInspection: "Tháng 3/2026",
  },
  {
    id: 4,
    x: 38,
    y: 55,
    status: "safe",
    name: "Chả Cá Lã Vọng",
    district: "Hoàn Kiếm",
    rating: 4.7,
    lastInspection: "Tháng 1/2026",
  },
  {
    id: 5,
    x: 72,
    y: 62,
    status: "review",
    name: "Quán nướng chợ đêm",
    district: "Đống Đa",
    rating: 3.8,
    lastInspection: "Tháng 2/2026",
  },
  {
    id: 6,
    x: 25,
    y: 70,
    status: "safe",
    name: "Cà Phê Giảng",
    district: "Hoàn Kiếm",
    rating: 4.6,
    lastInspection: "Tháng 3/2026",
  },
  {
    id: 7,
    x: 55,
    y: 75,
    status: "safe",
    name: "Bánh Mì 25",
    district: "Hoàn Kiếm",
    rating: 4.5,
    lastInspection: "Tháng 2/2026",
  },
  {
    id: 8,
    x: 78,
    y: 30,
    status: "review",
    name: "Cơm Rang Dương Châu",
    district: "Cầu Giấy",
    rating: 4.0,
    lastInspection: "Tháng 1/2026",
  },
];

// District labels for the map
const districtLabels = [
  { name: "Hoàn Kiếm", x: 35, y: 42 },
  { name: "Hai Bà Trưng", x: 58, y: 35 },
  { name: "Đống Đa", x: 55, y: 68 },
  { name: "Cầu Giấy", x: 20, y: 55 },
  { name: "Ba Đình", x: 25, y: 25 },
];

function LocationPin({
  pin,
  onHover,
  isActive,
}: {
  pin: (typeof mapPins)[0];
  onHover: (id: number | null) => void;
  isActive: boolean;
}) {
  const getColor = () => {
    switch (pin.status) {
      case "safe":
        return { bg: "bg-primary", shadow: "shadow-primary/50", ring: "ring-primary/30" };
      case "violation":
        return { bg: "bg-destructive", shadow: "shadow-destructive/50", ring: "ring-destructive/30" };
      case "review":
        return { bg: "bg-secondary", shadow: "shadow-secondary/50", ring: "ring-secondary/30" };
      default:
        return { bg: "bg-primary", shadow: "shadow-primary/50", ring: "ring-primary/30" };
    }
  };

  const colors = getColor();

  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: pin.id * 0.08, type: "spring", stiffness: 300 }}
      onMouseEnter={() => onHover(pin.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Pin */}
      <motion.div
        animate={{
          scale: isActive ? 1.4 : 1,
          y: isActive ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative w-5 h-5 rounded-full ${colors.bg} border-2 border-card flex items-center justify-center shadow-lg ${colors.shadow} transition-all`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-card" />

        {/* Pulse ring */}
        <motion.div
          className={`absolute inset-0 rounded-full ${colors.bg}`}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Active ring */}
        {isActive && (
          <motion.div
            className={`absolute -inset-1 rounded-full ring-2 ${colors.ring}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        )}
      </motion.div>

      {/* Enhanced Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 10,
          scale: isActive ? 1 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-20"
      >
        <div className="bg-card/98 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-4 min-w-[200px]">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center text-card shrink-0`}
            >
              {pin.status === "safe" && <Shield className="w-5 h-5" />}
              {pin.status === "violation" && <AlertTriangle className="w-5 h-5" />}
              {pin.status === "review" && <Clock className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground text-sm leading-tight">
                {pin.name}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPinIcon className="w-3 h-3" />
                {pin.district}
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-xs font-medium text-foreground">{pin.rating}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{pin.lastInspection}</span>
            </div>
          </div>
          
          {/* Status badge */}
          <div className={`mt-3 px-2.5 py-1 rounded-full text-xs font-medium text-center ${
            pin.status === "safe" ? "bg-primary/10 text-primary" :
            pin.status === "violation" ? "bg-destructive/10 text-destructive" :
            "bg-secondary/20 text-secondary-foreground"
          }`}>
            {pin.status === "safe" && "Chứng nhận an toàn"}
            {pin.status === "violation" && "Phát hiện vi phạm"}
            {pin.status === "review" && "Đang xem xét"}
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
      </motion.div>
    </motion.div>
  );
}

export function MapPreviewSection() {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  return (
    <section
      id="map"
      className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background map pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <StylizedHanoiMap className="w-full h-full text-foreground" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <MapPinIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Dữ liệu an toàn thực phẩm
              </span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Bản đồ an toàn thực phẩm
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Khám phá dữ liệu an toàn thực phẩm trên toàn bộ các quận của Hà Nội.
              Bản đồ tương tác hiển thị kết quả kiểm tra, nhà hàng được chứng nhận,
              và các khu vực cần chú ý.
            </p>

            {/* Legend */}
            <div className="mt-8 space-y-3">
              {[
                {
                  color: "bg-primary",
                  label: "Chứng nhận an toàn",
                  desc: "Đạt tất cả kiểm tra",
                  count: 2547,
                },
                {
                  color: "bg-destructive",
                  label: "Phát hiện vi phạm",
                  desc: "Không đạt kiểm tra gần nhất",
                  count: 89,
                },
                {
                  color: "bg-secondary",
                  label: "Đang xem xét",
                  desc: "Chờ kiểm tra",
                  count: 156,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm cursor-default group hover:border-border transition-all"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className={`w-4 h-4 rounded-full ${item.color} shadow-lg`}
                    />
                    <div>
                      <div className="font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {item.count.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                Mở bản đồ đầy đủ
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Map Container */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card/90 to-card/60 border border-border/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Stylized Map Background */}
                <div className="absolute inset-0 opacity-60">
                  <StylizedHanoiMap className="w-full h-full text-primary" />
                </div>
                
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-card/20" />

                {/* District Labels */}
                {districtLabels.map((district, i) => (
                  <motion.div
                    key={district.name}
                    className="absolute text-xs font-medium text-muted-foreground/70 pointer-events-none"
                    style={{ left: `${district.x}%`, top: `${district.y}%` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {district.name}
                  </motion.div>
                ))}

                {/* Map Pins */}
                {mapPins.map((pin) => (
                  <LocationPin
                    key={pin.id}
                    pin={pin}
                    onHover={setHoveredPin}
                    isActive={hoveredPin === pin.id}
                  />
                ))}

                {/* Hanoi label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg">
                  <span className="text-sm font-semibold text-foreground">
                    Hà Nội, Việt Nam
                  </span>
                </div>
                
                {/* Zoom controls (decorative) */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground font-medium text-sm hover:bg-card cursor-pointer transition-colors">
                    +
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground font-medium text-sm hover:bg-card cursor-pointer transition-colors">
                    -
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="absolute -bottom-6 -left-6 bg-card/98 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-4 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      2.547
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Địa điểm an toàn
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                whileHover={{ scale: 1.02, y: 2 }}
                className="absolute -top-6 -right-6 bg-card/98 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-4 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPinIcon className="w-6 h-6 text-secondary" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">
                      Quận/Huyện
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
