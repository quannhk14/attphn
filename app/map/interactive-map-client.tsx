"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Filter,
  Shield,
  AlertTriangle,
  Clock,
  Star,
  Phone,
  Calendar,
  ChevronDown,
  X,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  History,
  Building2,
  Utensils,
  Coffee,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Header } from "@/components/header";
import { StylizedHanoiMap } from "@/components/stylized-hanoi-map";
import { foodPlaces, districts, type FoodPlace } from "@/lib/map-data";

type StatusFilter = "all" | "safe" | "violation" | "review";
type TypeFilter = "all" | "Nhà hàng" | "Quán ăn" | "Quán cà phê" | "Hàng rong";

function getStatusColor(status: FoodPlace["status"]) {
  switch (status) {
    case "safe":
      return {
        bg: "bg-primary",
        text: "text-primary",
        bgLight: "bg-primary/10",
        border: "border-primary/30",
        shadow: "shadow-primary/50",
      };
    case "violation":
      return {
        bg: "bg-destructive",
        text: "text-destructive",
        bgLight: "bg-destructive/10",
        border: "border-destructive/30",
        shadow: "shadow-destructive/50",
      };
    case "review":
      return {
        bg: "bg-secondary",
        text: "text-secondary-foreground",
        bgLight: "bg-secondary/20",
        border: "border-secondary/30",
        shadow: "shadow-secondary/50",
      };
  }
}

function getStatusLabel(status: FoodPlace["status"]) {
  switch (status) {
    case "safe":
      return "Chứng nhận an toàn";
    case "violation":
      return "Phát hiện vi phạm";
    case "review":
      return "Đang xem xét";
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Nhà hàng":
      return Building2;
    case "Quán ăn":
      return Utensils;
    case "Quán cà phê":
      return Coffee;
    case "Hàng rong":
      return ChefHat;
    default:
      return Utensils;
  }
}

// Map Pin Component
function MapPinComponent({
  place,
  isActive,
  onClick,
  isFiltered,
}: {
  place: FoodPlace;
  isActive: boolean;
  onClick: () => void;
  isFiltered: boolean;
}) {
  const colors = getStatusColor(place.status);

  if (!isFiltered) return null;

  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{ left: `${place.coordinates.x}%`, top: `${place.coordinates.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.5 : 1,
          y: isActive ? -6 : 0,
        }}
        whileHover={{ scale: 1.3 }}
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
            className={`absolute -inset-1.5 rounded-full ring-2 ${colors.border}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Place List Item Component
function PlaceListItem({
  place,
  isActive,
  onClick,
}: {
  place: FoodPlace;
  isActive: boolean;
  onClick: () => void;
}) {
  const colors = getStatusColor(place.status);
  const TypeIcon = getTypeIcon(place.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isActive
          ? `${colors.bgLight} ${colors.border} border`
          : "bg-card/50 border-border/50 hover:border-border"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${colors.bgLight} flex items-center justify-center shrink-0`}>
          {place.status === "safe" && <Shield className={`w-5 h-5 ${colors.text}`} />}
          {place.status === "violation" && <AlertTriangle className={`w-5 h-5 ${colors.text}`} />}
          {place.status === "review" && <Clock className={`w-5 h-5 ${colors.text}`} />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-sm leading-tight truncate">
            {place.name}
          </h4>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{place.district}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3 text-secondary fill-secondary" />
              <span className="font-medium text-foreground">{place.rating}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <TypeIcon className="w-3 h-3" />
              {place.type}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Place Detail Modal
function PlaceDetailModal({
  place,
  open,
  onClose,
}: {
  place: FoodPlace | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!place) return null;

  const colors = getStatusColor(place.status);
  const TypeIcon = getTypeIcon(place.type);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="sr-only">{place.name}</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl ${colors.bgLight} flex items-center justify-center shrink-0`}>
            {place.status === "safe" && <Shield className={`w-7 h-7 ${colors.text}`} />}
            {place.status === "violation" && <AlertTriangle className={`w-7 h-7 ${colors.text}`} />}
            {place.status === "review" && <Clock className={`w-7 h-7 ${colors.text}`} />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground">{place.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{place.address}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`mt-4 px-4 py-2 rounded-xl ${colors.bgLight} ${colors.border} border flex items-center justify-between`}>
          <span className={`font-medium ${colors.text}`}>{getStatusLabel(place.status)}</span>
          <span className="text-sm text-muted-foreground">Cập nhật: {place.lastInspection}</span>
        </div>

        {/* Info Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Star className="w-3.5 h-3.5" />
              Đánh giá
            </div>
            <div className="mt-1 text-lg font-bold text-foreground flex items-center gap-1">
              {place.rating}
              <Star className="w-4 h-4 text-secondary fill-secondary" />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <TypeIcon className="w-3.5 h-3.5" />
              Loại hình
            </div>
            <div className="mt-1 text-lg font-bold text-foreground">{place.type}</div>
          </div>
        </div>

        {/* Contact */}
        {place.phone && (
          <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{place.phone}</span>
            </div>
            <Button size="sm" variant="outline" className="rounded-full text-xs">
              Gọi ngay
            </Button>
          </div>
        )}

        {/* Inspection History */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
            <History className="w-4 h-4" />
            Lịch sử kiểm tra
          </div>
          <div className="space-y-2">
            {place.inspectionHistory.map((inspection, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  inspection.result === "pass"
                    ? "bg-primary/10"
                    : inspection.result === "fail"
                    ? "bg-destructive/10"
                    : "bg-secondary/20"
                }`}>
                  {inspection.result === "pass" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  {inspection.result === "fail" && <XCircle className="w-4 h-4 text-destructive" />}
                  {inspection.result === "pending" && <Clock className="w-4 h-4 text-secondary-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {inspection.result === "pass" && "Đạt"}
                      {inspection.result === "fail" && "Không đạt"}
                      {inspection.result === "pending" && "Chờ xử lý"}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {inspection.date}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{inspection.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function InteractiveMapClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedPlace, setSelectedPlace] = useState<FoodPlace | null>(null);
  const [activePlace, setActivePlace] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Filter places
  const filteredPlaces = useMemo(() => {
    return foodPlaces.filter((place) => {
      const matchesSearch =
        searchQuery === "" ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || place.status === statusFilter;
      const matchesType = typeFilter === "all" || place.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      safe: filteredPlaces.filter((p) => p.status === "safe").length,
      violation: filteredPlaces.filter((p) => p.status === "violation").length,
      review: filteredPlaces.filter((p) => p.status === "review").length,
      total: filteredPlaces.length,
    };
  }, [filteredPlaces]);

  const handlePlaceClick = (place: FoodPlace) => {
    setSelectedPlace(place);
    setActivePlace(place.id);
    setDetailModalOpen(true);
  };

  const handleListItemClick = (place: FoodPlace) => {
    setActivePlace(place.id);
    setSelectedPlace(place);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 h-screen flex flex-col">
        {/* Top Bar */}
        <div className="bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Trang chủ
              </Button>
            </Link>

            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nhà hàng, địa chỉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full bg-muted/50 border-border/50 focus:border-primary/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="max-w-7xl mx-auto pt-4 pb-2 flex flex-wrap gap-4">
                  {/* Status Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Trạng thái:</span>
                    <div className="flex gap-1">
                      {(["all", "safe", "violation", "review"] as StatusFilter[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            statusFilter === status
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {status === "all" && "Tất cả"}
                          {status === "safe" && "An toàn"}
                          {status === "violation" && "Vi phạm"}
                          {status === "review" && "Xem xét"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Loại:</span>
                    <div className="flex gap-1">
                      {(["all", "Nhà hàng", "Quán ăn", "Quán cà phê", "Hàng rong"] as TypeFilter[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setTypeFilter(type)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            typeFilter === type
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {type === "all" ? "Tất cả" : type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 lg:w-96 bg-card/50 border-r border-border overflow-y-auto">
            {/* Stats */}
            <div className="p-4 border-b border-border/50">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
                  <div className="text-lg font-bold text-primary">{stats.safe}</div>
                  <div className="text-xs text-muted-foreground">An toàn</div>
                </div>
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
                  <div className="text-lg font-bold text-destructive">{stats.violation}</div>
                  <div className="text-xs text-muted-foreground">Vi phạm</div>
                </div>
                <div className="p-3 rounded-xl bg-secondary/20 border border-secondary/30 text-center">
                  <div className="text-lg font-bold text-secondary-foreground">{stats.review}</div>
                  <div className="text-xs text-muted-foreground">Xem xét</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Hiển thị {stats.total} cơ sở trong khu vực
              </p>
            </div>

            {/* Place List */}
            <div className="p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredPlaces.map((place) => (
                  <PlaceListItem
                    key={place.id}
                    place={place}
                    isActive={activePlace === place.id}
                    onClick={() => handleListItemClick(place)}
                  />
                ))}
              </AnimatePresence>

              {filteredPlaces.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Không tìm thấy kết quả</p>
                  <Button
                    variant="link"
                    className="mt-2 text-primary"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative bg-gradient-to-br from-muted/30 to-background overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <StylizedHanoiMap className="w-full h-full text-foreground" />
            </div>

            {/* Map Container */}
            <div className="absolute inset-8 rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Stylized Map Background */}
              <div className="absolute inset-0 opacity-50">
                <StylizedHanoiMap className="w-full h-full text-primary" />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-card/20" />

              {/* District Labels */}
              {districts.map((district) => (
                <div
                  key={district.id}
                  className="absolute text-xs font-medium text-muted-foreground/60 pointer-events-none"
                  style={{ left: `${district.coordinates.x}%`, top: `${district.coordinates.y}%` }}
                >
                  {district.name}
                </div>
              ))}

              {/* Map Pins */}
              <AnimatePresence>
                {foodPlaces.map((place) => (
                  <MapPinComponent
                    key={place.id}
                    place={place}
                    isActive={activePlace === place.id}
                    onClick={() => handlePlaceClick(place)}
                    isFiltered={filteredPlaces.some((p) => p.id === place.id)}
                  />
                ))}
              </AnimatePresence>

              {/* Header */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg">
                <span className="text-sm font-semibold text-foreground">Hà Nội, Việt Nam</span>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg">
                <div className="text-xs font-medium text-foreground mb-2">Chú thích</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-lg" />
                    <span className="text-xs text-muted-foreground">An toàn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive shadow-lg" />
                    <span className="text-xs text-muted-foreground">Vi phạm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary shadow-lg" />
                    <span className="text-xs text-muted-foreground">Xem xét</span>
                  </div>
                </div>
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1">
                <div className="w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground font-medium text-sm hover:bg-card cursor-pointer transition-colors">
                  +
                </div>
                <div className="w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground font-medium text-sm hover:bg-card cursor-pointer transition-colors">
                  -
                </div>
              </div>
            </div>

            {/* Selected Place Preview Card */}
            <AnimatePresence>
              {selectedPlace && !detailModalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 20, x: "-50%" }}
                  className="absolute bottom-12 left-1/2 z-20"
                >
                  <div
                    className="bg-card/98 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-4 min-w-[280px] cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => setDetailModalOpen(true)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl ${getStatusColor(selectedPlace.status).bgLight} flex items-center justify-center shrink-0`}>
                        {selectedPlace.status === "safe" && <Shield className={`w-6 h-6 ${getStatusColor(selectedPlace.status).text}`} />}
                        {selectedPlace.status === "violation" && <AlertTriangle className={`w-6 h-6 ${getStatusColor(selectedPlace.status).text}`} />}
                        {selectedPlace.status === "review" && <Clock className={`w-6 h-6 ${getStatusColor(selectedPlace.status).text}`} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">{selectedPlace.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {selectedPlace.district}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 text-secondary fill-secondary" />
                            <span className="font-medium text-foreground">{selectedPlace.rating}</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPlace.status).bgLight} ${getStatusColor(selectedPlace.status).text}`}>
                            {getStatusLabel(selectedPlace.status)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlace(null);
                          setActivePlace(null);
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <PlaceDetailModal
        place={selectedPlace}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </main>
  );
}
