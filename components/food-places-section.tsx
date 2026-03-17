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
  X,
  FileWarning,
  CheckCircle,
  Clock,
  Phone,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Restaurant {
  id: number;
  name: string;
  address: string;
  status: "safe" | "violation";
  rating: number;
  inspectionDate: string;
  image: string;
  type: string;
  // Additional details for modal
  phone?: string;
  hygieneScore?: number;
  certificationInfo?: string;
  violationDetails?: string;
  penaltyInfo?: string;
  lastInspectionDetails?: string;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pho 10 Ly Quoc Su",
    address: "10 Ly Quoc Su, Hoan Kiem",
    status: "safe",
    rating: 4.8,
    inspectionDate: "Tháng 3/2026",
    image: "🍜",
    type: "Pho",
    phone: "024-3824-2468",
    hygieneScore: 95,
    certificationInfo: "Chứng nhận ATTP cấp A - Cơ sở đạt chuẩn vệ sinh an toàn thực phẩm theo quy định Bộ Y tế",
    lastInspectionDetails: "Kiểm tra định kỳ ngày 15/03/2026. Tất cả tiêu chí đạt yêu cầu.",
  },
  {
    id: 2,
    name: "Bun Cha Huong Lien",
    address: "24 Le Van Huu, Hai Ba Trung",
    status: "safe",
    rating: 4.9,
    inspectionDate: "Tháng 2/2026",
    image: "🍲",
    type: "Bun cha",
    phone: "024-3943-4106",
    hygieneScore: 98,
    certificationInfo: "Chứng nhận ATTP cấp A - Nhà hàng Obama đã từng đến. Cơ sở mẫu mực về an toàn thực phẩm.",
    lastInspectionDetails: "Kiểm tra ngày 20/02/2026. Xuất sắc về vệ sinh bếp và bảo quản thực phẩm.",
  },
  {
    id: 3,
    name: "Cha Ca La Vong",
    address: "14 Cha Ca, Hoan Kiem",
    status: "safe",
    rating: 4.7,
    inspectionDate: "Tháng 3/2026",
    image: "🐟",
    type: "Hải sản",
    phone: "024-3825-3929",
    hygieneScore: 92,
    certificationInfo: "Chứng nhận ATTP cấp B - Cơ sở truyền thống đạt chuẩn. Nguồn hải sản rõ ràng.",
    lastInspectionDetails: "Kiểm tra ngày 10/03/2026. Đạt yêu cầu về vệ sinh và nguồn gốc thực phẩm.",
  },
  {
    id: 4,
    name: "Banh Mi 25",
    address: "25 Hang Ca, Hoan Kiem",
    status: "safe",
    rating: 4.6,
    inspectionDate: "Tháng 1/2026",
    image: "🥖",
    type: "Ăn vặt",
    phone: "024-3828-8818",
    hygieneScore: 90,
    certificationInfo: "Chứng nhận ATTP cấp B - Quán ăn vặt đạt chuẩn vệ sinh.",
    lastInspectionDetails: "Kiểm tra ngày 25/01/2026. Đạt yêu cầu cơ bản, cần cải thiện hệ thống thông gió.",
  },
  {
    id: 5,
    name: "Quan an goc pho",
    address: "56 Pho Hue, Hai Ba Trung",
    status: "violation",
    rating: 3.2,
    inspectionDate: "Tháng 2/2026",
    image: "🍢",
    type: "Ăn vặt",
    violationDetails: "Vi phạm vệ sinh an toàn thực phẩm: Bảo quản thực phẩm không đúng quy định, thiếu giấy chứng nhận nguồn gốc.",
    penaltyInfo: "Phạt hành chính 15.000.000 VND. Đình chỉ hoạt động 15 ngày để khắc phục.",
    lastInspectionDetails: "Kiểm tra ngày 18/02/2026. Phát hiện nhiều vi phạm nghiêm trọng.",
  },
  {
    id: 6,
    name: "Quan nuong cho dem",
    address: "Cho Dong Xuan",
    status: "violation",
    rating: 3.0,
    inspectionDate: "Tháng 3/2026",
    image: "🥩",
    type: "Đồ nướng",
    violationDetails: "Không có giấy phép kinh doanh thực phẩm. Nguồn gốc thịt không rõ ràng. Điều kiện vệ sinh kém.",
    penaltyInfo: "Phạt hành chính 25.000.000 VND. Cấm hoạt động cho đến khi đủ điều kiện.",
    lastInspectionDetails: "Kiểm tra đột xuất ngày 05/03/2026. Vi phạm nghiêm trọng về an toàn thực phẩm.",
  },
];

function RestaurantDetailModal({
  restaurant,
  open,
  onClose,
}: {
  restaurant: Restaurant | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!restaurant) return null;

  const isSafe = restaurant.status === "safe";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-border/50 p-0 overflow-hidden">
        {/* Header with gradient based on status */}
        <div
          className={`relative p-6 ${
            isSafe
              ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
              : "bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent"
          }`}
        >
          <DialogHeader>
            <div className="flex items-start gap-4">
              {/* Icon/Image */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                  isSafe ? "bg-primary/10" : "bg-destructive/10"
                }`}
              >
                {restaurant.image}
              </motion.div>

              <div className="flex-1">
                <DialogTitle className="text-xl font-bold text-foreground">
                  {restaurant.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {restaurant.type}
                </p>

                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    isSafe
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-destructive/20 text-destructive border border-destructive/30"
                  }`}
                >
                  {isSafe ? (
                    <>
<BadgeCheck className="w-3.5 h-3.5" />
                                      Chứng nhận an toàn
                    </>
                  ) : (
                    <>
<FileWarning className="w-3.5 h-3.5" />
                                      Có vi phạm
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{restaurant.address}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-sm"
            >
              <Star className="w-4 h-4 text-secondary fill-secondary" />
              <span className="text-foreground font-medium">
                {restaurant.rating}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{restaurant.inspectionDate}</span>
            </motion.div>
            {restaurant.phone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{restaurant.phone}</span>
              </motion.div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Status-specific content */}
          {isSafe ? (
            <>
              {/* Hygiene Score */}
              {restaurant.hygieneScore && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Điểm vệ sinh
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {restaurant.hygieneScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-primary/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${restaurant.hygieneScore}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Certification Info */}
              {restaurant.certificationInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Thông tin chứng nhận
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {restaurant.certificationInfo}
                  </p>
                </motion.div>
              )}

              {/* Last Inspection */}
              {restaurant.lastInspectionDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Kiểm tra gần nhất
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {restaurant.lastInspectionDetails}
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Violation Details */}
              {restaurant.violationDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-foreground block mb-1">
                        Chi tiết vi phạm
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.violationDetails}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Penalty Info */}
              {restaurant.penaltyInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium text-foreground">
                      Hình thức xử lý
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {restaurant.penaltyInfo}
                  </p>
                </motion.div>
              )}

              {/* Last Inspection */}
              {restaurant.lastInspectionDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Lần kiểm tra gần nhất
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {restaurant.lastInspectionDetails}
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RestaurantCard({
  restaurant,
  onSelect,
}: {
  restaurant: Restaurant;
  onSelect: (r: Restaurant) => void;
}) {
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
      onClick={() => onSelect(restaurant)}
      className={`group relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer ${
        restaurant.status === "safe"
          ? "border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
          : "border-destructive/30 hover:border-destructive/50 hover:shadow-xl hover:shadow-destructive/10"
      }`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          restaurant.status === "safe"
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
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
            restaurant.status === "safe"
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
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(
    null
  );

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
        {/* Header with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Địa điểm ẩm thực đã xác minh
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Khám phá các nhà hàng được chứng nhận và theo dõi vi phạm an toàn
              thực phẩm tại Hà Nội
            </p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <FileWarning className="mr-2 w-4 h-4" />
              Dang ky / Phan anh ATTP
            </Button>
          </motion.div>
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
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "safe"
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
                An toan
              </span>
            </button>
            <button
              onClick={() => handleTabChange("violations")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "violations"
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
                Vi pham
              </span>
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <RestaurantSkeleton key={`skeleton-${i}`} />
                ))
              : filteredRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <RestaurantCard
                      restaurant={restaurant}
                      onSelect={setSelectedRestaurant}
                    />
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
            Xem tat ca
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        open={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </section>
  );
}
