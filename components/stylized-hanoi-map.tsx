"use client";

import { motion } from "framer-motion";

export function StylizedHanoiMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for water */}
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
        {/* Gradient for districts */}
        <linearGradient id="districtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Background grid - streets pattern */}
      <g className="text-foreground" opacity="0.05">
        {/* Horizontal roads */}
        {[60, 100, 140, 180, 220, 260, 300, 340].map((y, i) => (
          <motion.line
            key={`h-${i}`}
            x1="20"
            y1={y}
            x2="380"
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05 }}
          />
        ))}
        {/* Vertical roads */}
        {[60, 100, 140, 180, 220, 260, 300, 340].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="20"
            x2={x}
            y2="380"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05 }}
          />
        ))}
      </g>

      {/* Main roads - diagonal/curved */}
      <g className="text-foreground" opacity="0.1">
        <motion.path
          d="M50,200 Q150,180 200,200 Q250,220 350,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
        <motion.path
          d="M200,50 Q180,150 200,200 Q220,250 200,350"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
        />
        <motion.path
          d="M80,80 Q140,140 200,200 Q260,260 320,320"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M320,80 Q260,140 200,200 Q140,260 80,320"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
        />
      </g>

      {/* Districts */}
      <g className="text-primary">
        {/* Hoan Kiem (center) */}
        <motion.path
          d="M160,160 Q180,150 220,160 Q240,180 230,220 Q210,240 180,235 Q155,220 160,190 Z"
          fill="url(#districtGradient)"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        {/* Ba Dinh (northwest) */}
        <motion.path
          d="M80,80 Q120,70 150,90 Q160,120 140,150 Q110,160 80,140 Q60,110 80,80 Z"
          fill="url(#districtGradient)"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
        {/* Hai Ba Trung (east) */}
        <motion.path
          d="M250,140 Q290,130 320,160 Q340,200 320,240 Q280,260 250,240 Q230,200 250,140 Z"
          fill="url(#districtGradient)"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        {/* Dong Da (south) */}
        <motion.path
          d="M140,260 Q180,250 220,265 Q250,290 240,330 Q200,350 160,335 Q130,310 140,260 Z"
          fill="url(#districtGradient)"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        />
        {/* Cau Giay (west) */}
        <motion.path
          d="M60,180 Q90,160 120,180 Q130,220 110,260 Q70,270 50,240 Q40,200 60,180 Z"
          fill="url(#districtGradient)"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </g>

      {/* Hoan Kiem Lake (center landmark) */}
      <motion.ellipse
        cx="195"
        cy="195"
        rx="20"
        ry="30"
        fill="url(#waterGradient)"
        className="text-primary"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
      />

      {/* West Lake (Ho Tay) */}
      <motion.ellipse
        cx="100"
        cy="60"
        rx="35"
        ry="25"
        fill="url(#waterGradient)"
        className="text-primary"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
      />

      {/* Red River (curved) */}
      <motion.path
        d="M350,30 Q370,100 360,200 Q350,300 370,380"
        fill="none"
        className="text-primary"
        stroke="currentColor"
        strokeWidth="8"
        opacity="0.15"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </svg>
  );
}
