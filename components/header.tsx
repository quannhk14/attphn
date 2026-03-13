"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Shield, Utensils } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                <Utensils className="w-2.5 h-2.5 text-secondary-foreground" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-foreground text-lg">
                An Toàn Thực Phẩm HN
              </span>
            </div>
          </motion.div>

          {/* Search Bar - Center */}
          <motion.div
            className="flex-1 max-w-md mx-4 hidden md:block"
            animate={{
              scale: isSearchFocused ? 1.02 : 1,
            }}
          >
            <div
              className={`relative flex items-center rounded-full border transition-all duration-300 ${
                isSearchFocused
                  ? "border-primary bg-card shadow-lg shadow-primary/10"
                  : "border-border bg-muted/50"
              }`}
            >
              <Search className="w-4 h-4 text-muted-foreground ml-4" />
              <input
                type="text"
                placeholder="Tìm nhà hàng, quán ăn, quán cà phê..."
                className="w-full py-2.5 px-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </motion.div>

          {/* Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative flex items-center rounded-full border border-border bg-muted/50">
            <Search className="w-4 h-4 text-muted-foreground ml-4" />
            <input
              type="text"
              placeholder="Tìm nhà hàng..."
              className="w-full py-2.5 px-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl"
          >
            <nav className="px-4 py-4 space-y-2">
              {["Địa điểm an toàn", "Bản đồ", "Tin tức", "Giới thiệu"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
