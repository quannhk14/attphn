"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, CheckCircle, Star, MapPin } from "lucide-react";
import { StylizedHanoiMap } from "./stylized-hanoi-map";

// Wrapper to prevent hydration mismatch with Framer Motion
function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
}

// Floating food icons with their positions and animations
const floatingIcons = [
  { emoji: "🍜", x: 8, y: 15, delay: 0, size: "text-5xl" },
  { emoji: "🥢", x: 88, y: 12, delay: 0.3, size: "text-4xl" },
  { emoji: "🍲", x: 78, y: 72, delay: 0.6, size: "text-5xl" },
  { emoji: "🥟", x: 12, y: 78, delay: 0.9, size: "text-4xl" },
  { emoji: "☕", x: 92, y: 48, delay: 1.2, size: "text-4xl" },
  { emoji: "🍱", x: 4, y: 48, delay: 1.5, size: "text-5xl" },
];

// Safety badges - positioned on the right side to avoid overlap with left content
const badges = [
  { icon: Shield, label: "Chứng nhận", color: "bg-primary", x: 58, y: 72 },
  { icon: CheckCircle, label: "Đã kiểm tra", color: "bg-primary", x: 78, y: 45 },
  { icon: Star, label: "Đánh giá cao", color: "bg-secondary", x: 68, y: 18 },
];

// Interactive map pins for hero
const heroPins = [
  { id: 1, x: 35, y: 35, status: "safe", name: "Phở 10", district: "Hoàn Kiếm" },
  { id: 2, x: 55, y: 45, status: "safe", name: "Bún Chả", district: "Hai Bà Trưng" },
  { id: 3, x: 45, y: 60, status: "violation", name: "Quán ăn vỉa hè", district: "Đống Đa" },
  { id: 4, x: 65, y: 30, status: "review", name: "Cà Phê Giảng", district: "Hoàn Kiếm" },
  { id: 5, x: 30, y: 55, status: "safe", name: "Bánh Mì 25", district: "Hoàn Kiếm" },
];

function HeroMapPin({ pin, hoveredPin, setHoveredPin }: { 
  pin: typeof heroPins[0]; 
  hoveredPin: number | null;
  setHoveredPin: (id: number | null) => void;
}) {
  const isActive = hoveredPin === pin.id;
  const getColor = () => {
    switch (pin.status) {
      case "safe": return "bg-primary";
      case "violation": return "bg-destructive";
      case "review": return "bg-secondary";
      default: return "bg-primary";
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer pointer-events-auto z-10"
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 + pin.id * 0.1, type: "spring" }}
      onMouseEnter={() => setHoveredPin(pin.id)}
      onMouseLeave={() => setHoveredPin(null)}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.4 : 1,
          y: isActive ? -5 : 0,
        }}
        className="relative"
      >
        {/* Pin marker */}
        <div className={`w-4 h-4 rounded-full ${getColor()} border-2 border-card shadow-lg`}>
          <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: 'currentColor' }} />
        </div>
        
        {/* Pulse ring */}
        <motion.div
          className={`absolute inset-0 rounded-full ${getColor()}`}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 10,
          scale: isActive ? 1 : 0.9,
        }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-20"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl p-3 min-w-[150px]">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${getColor()}`} />
            <span className="font-medium text-foreground text-sm">{pin.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {pin.district}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero3DSceneContent() {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const parallaxX = useTransform(springX, [0, 1], [-20, 20]);
  const parallaxY = useTransform(springY, [0, 1], [-20, 20]);
  const parallaxXSlow = useTransform(springX, [0, 1], [-10, 10]);
  const parallaxYSlow = useTransform(springY, [0, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Background gradient orbs with parallax */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-primary/8 blur-3xl"
        style={{ 
          left: "55%", 
          top: "15%",
          x: parallaxX,
          y: parallaxY,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-secondary/8 blur-3xl"
        style={{ 
          left: "5%", 
          top: "55%",
          x: parallaxXSlow,
          y: parallaxYSlow,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stylized Hanoi Map Background with parallax */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] opacity-40"
        style={{
          x: parallaxXSlow,
          y: parallaxYSlow,
        }}
      >
        <StylizedHanoiMap className="text-primary" />
        
        {/* Interactive pins on map */}
        <div className="absolute inset-0">
          {heroPins.map((pin) => (
            <HeroMapPin 
              key={pin.id} 
              pin={pin} 
              hoveredPin={hoveredPin}
              setHoveredPin={setHoveredPin}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating food icons with parallax */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} pointer-events-none`}
          style={{ 
            left: `${item.x}%`, 
            top: `${item.y}%`,
            x: index % 2 === 0 ? parallaxX : parallaxXSlow,
            y: index % 2 === 0 ? parallaxY : parallaxYSlow,
          }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: item.delay,
            duration: 0.5,
            type: "spring",
          }}
        >
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="drop-shadow-2xl"
          >
            {item.emoji}
          </motion.div>
        </motion.div>
      ))}

      {/* Animated safety badges with parallax */}
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none"
          style={{ 
            left: `${badge.x}%`, 
            top: `${badge.y}%`,
            x: parallaxXSlow,
            y: parallaxYSlow,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5 + index * 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full ${badge.color} text-primary-foreground shadow-xl backdrop-blur-sm border border-white/10`}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <badge.icon className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium whitespace-nowrap">
              {badge.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Decorative animated circles */}
      {[
        { x: 30, y: 40, size: 3, delay: 0 },
        { x: 65, y: 75, size: 2, delay: 0.5 },
        { x: 80, y: 28, size: 4, delay: 1 },
        { x: 15, y: 65, size: 2.5, delay: 0.3 },
        { x: 50, y: 15, size: 3, delay: 0.7 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30 pointer-events-none"
          style={{ 
            left: `${dot.x}%`, 
            top: `${dot.y}%`,
            width: `${dot.size * 4}px`,
            height: `${dot.size * 4}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: dot.delay }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ClientOnly>
        <Hero3DSceneContent />
      </ClientOnly>
    </div>
  );
}
