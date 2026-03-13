"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Restaurant {
  id: number;
  name: string;
  address: string;
  status: "safe" | "violation";
  rating: number;
  inspectionDate: string;
  image: string;
  type: string;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Phở 10 Lý Quốc Sư",
    address: "10 Lý Quốc Sư, Hoàn Kiếm",
    status: "safe",
    rating: 4.8,
    inspectionDate: "Tháng 3/2026",
    image: "🍜",
    type: "Phở",
  },
  {
    id: 2,
    name: "Bún Chả Hương Liên",
    address: "24 Lê Văn Hưu, Hai Bà Trưng",
    status: "safe",
    rating: 4.9,
    inspectionDate: "Tháng 2/2026",
    image: "🍲",
    type: "Bún chả",
  },
  {
    id: 3,
    name: "Chả Cá Lã Vọng",
    address: "14 Chả Cá, Hoàn Kiếm",
    status: "safe",
    rating: 4.7,
    inspectionDate: "Tháng 3/2026",
    image: "🐟",
    type: "Hải sản",
  },
  {
    id: 4,
    name: "Bánh Mì 25",
    address: "25 Hàng Cá, Hoàn Kiếm",
    status: "safe",
    rating: 4.6,
    inspectionDate: "Tháng 1/2026",
    image: "🥖",
    type: "Ăn vặt",
  },
  {
    id: 5,
    name: "Quán ăn góc phố",
    address: "56 Phố Huế, Hai Bà Trưng",
    status: "violation",
    rating: 3.2,
    inspectionDate: "Tháng 2/2026",
    image: "🍢",
    type: "Ăn vặt",
  },
  {
    id: 6,
    name: "Quán nướng chợ đêm",
    address: "Chợ Đồng Xuân",
    status: "violation",
    rating: 3.0,
    inspectionDate: "Tháng 3/2026",
    image: "🥩",
    type: "Đồ nướng",
  },
];

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 ${restaurant.status === "safe"
          ? "border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
          : "border-destructive/30 hover:border-destructive/50 hover:shadow-xl hover:shadow-destructive/10"
        }`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${restaurant.status === "safe"
            ? "bg-gradient-to-br from-primary/5 to-transparent"
            : "bg-gradient-to-br from-destructive/5 to-transparent"
          }`}
      />

      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
        <motion.span
          animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-6xl"
        >
          {restaurant.image}
        </motion.span>

        {/* Status Badge */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md ${restaurant.status === "safe"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-destructive/20 text-destructive border border-destructive/30"
            }`}
        >
          {restaurant.status === "safe" ? (
            <>
              <Shield className="w-3 h-3" />
              Chứng nhận
            </>
          ) : (
            <>
              <AlertTriangle className="w-3 h-3" />
              Vi phạm
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {restaurant.type}
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/20 text-secondary-foreground">
            <Star className="w-3.5 h-3.5 fill-current text-secondary" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Kiểm tra: {restaurant.inspectionDate}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="mt-4"
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full rounded-xl hover:bg-muted"
          >
            Xem chi tiết
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Skeleton Loader
function RestaurantSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="h-40 bg-muted" />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="h-6 w-12 bg-muted rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function FoodPlacesSection() {
  const [activeTab, setActiveTab] = useState<"safe" | "violations">("safe");
  const [isLoading, setIsLoading] = useState(false);

  const filteredRestaurants = restaurants.filter((r) =>
    activeTab === "safe" ? r.status === "safe" : r.status === "violation"
  );

  const handleTabChange = (tab: "safe" | "violations") => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <section id="safe-places" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Địa điểm ẩm thực đã xác minh
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá các nhà hàng được chứng nhận và theo dõi vi phạm an toàn
            thực phẩm tại Hà Nội
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex p-1.5 rounded-full bg-muted/50 border border-border">
            <button
              onClick={() => handleTabChange("safe")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "safe"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {activeTab === "safe" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full shadow-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Shield className="w-4 h-4" />
                An toàn
              </span>
            </button>
            <button
              onClick={() => handleTabChange("violations")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "violations"
                  ? "text-destructive-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {activeTab === "violations" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-destructive rounded-full shadow-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Vi phạm
              </span>
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? [...Array(3)].map((_, i) => <RestaurantSkeleton key={`skeleton-${i}`} />)
              : filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-border hover:bg-muted"
          >
            Xem tất cả
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
