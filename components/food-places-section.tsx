"use client";

import { useState, useEffect, useCallback } from "react";
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
  Upload,
  Building2,
  Send,
  Loader2,
  ShieldCheck,
  User,
  FileText,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface Organization {
  id: string;
  name: string;
  type: "supplier" | "transporter";
  location: string;
  certifications?: string[];
  avatar?: string;
  contact?: string;
}

interface SupplyChain {
  supplier: Organization;
  transporter: Organization;
}

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
  // Supply chain information
  supplyChain?: SupplyChain;
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
    supplyChain: {
      supplier: {
        id: "supplier-1",
        name: "Công ty TNHH Thực phẩm Sạch Việt",
        type: "supplier",
        location: "Hà Đông, Hà Nội",
        certifications: ["VietGAP"],
        avatar: "🏢",
        contact: "024-3456-7890",
      },
      transporter: {
        id: "transporter-1",
        name: "Vận tải An Toàn Việt",
        type: "transporter",
        location: "Cầu Giấy, Hà Nội",
        certifications: ["HACCP"],
        avatar: "🚛",
        contact: "024-5678-9012",
      },
    },
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
    supplyChain: {
      supplier: {
        id: "supplier-2",
        name: "Nông trại Bùi Viết - Sơn Tây",
        type: "supplier",
        location: "Sơn Tây, Hà Nội",
        certifications: ["VietGAP", "HACCP"],
        avatar: "🌾",
        contact: "024-7890-1234",
      },
      transporter: {
        id: "transporter-2",
        name: "Logistics Xanh Việt",
        type: "transporter",
        location: "Hoàng Mai, Hà Nội",
        certifications: ["ISO 22000"],
        avatar: "🚚",
        contact: "024-9012-3456",
      },
    },
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
    supplyChain: {
      supplier: {
        id: "supplier-3",
        name: "Cảng cá Hạ Long - Quảng Ninh",
        type: "supplier",
        location: "Hạ Long, Quảng Ninh",
        certifications: ["HACCP"],
        avatar: "🐠",
        contact: "033-1234-5678",
      },
      transporter: {
        id: "transporter-3",
        name: "Công ty Vận tải Lạnh Việt",
        type: "transporter",
        location: "Bắc Từ Liêm, Hà Nội",
        certifications: ["HACCP"],
        avatar: "❄️",
        contact: "024-3456-7890",
      },
    },
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
    supplyChain: {
      supplier: {
        id: "supplier-4",
        name: "Lò bánh mì Huyền - Hà Nội",
        type: "supplier",
        location: "Đống Đa, Hà Nội",
        certifications: ["VietGAP"],
        avatar: "🍞",
        contact: "024-5678-9012",
      },
      transporter: {
        id: "transporter-4",
        name: "Giao hàng nhanh Hà Nội",
        type: "transporter",
        location: "Hai Bà Trưng, Hà Nội",
        certifications: [],
        avatar: "🏃",
        contact: "024-7890-1234",
      },
    },
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

// Organization Detail Modal
function OrganizationModal({
  open,
  org,
  onClose,
}: {
  open: boolean;
  org?: Organization;
  onClose: () => void;
}) {
  if (!org) return null;

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md bg-card/98 backdrop-blur-2xl border-border/40 p-0 overflow-hidden shadow-2xl">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
              
              <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">
                <DialogHeader className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl border border-primary/20">
                      {org.avatar}
                    </div>
                    <div>
                      <DialogTitle className="text-lg font-bold text-foreground">
                        {org.name}
                      </DialogTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {org.type === "supplier" ? "Nhà cung cấp" : "Đơn vị vận chuyển"}
                      </p>
                    </div>
                  </motion.div>
                </DialogHeader>
              </div>

              <div className="px-6 pb-6 space-y-5">
                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Địa chỉ
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{org.location}</p>
                </motion.div>

                {/* Contact */}
                {org.contact && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Liên hệ
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">{org.contact}</p>
                  </motion.div>
                )}

                {/* Certifications */}
                {org.certifications && org.certifications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <BadgeCheck className="w-4 h-4 text-primary" />
                      Chứng nhận
                    </div>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {org.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

// Supply Chain Visual Block Component
function SupplyChainBlock({
  organization,
  onClick,
}: {
  organization: Organization;
  onClick?: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-muted/50 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg flex-shrink-0 border border-primary/20 group-hover:border-primary/40 transition-colors">
          {organization.avatar}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {organization.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {organization.type === "supplier" ? "Nhà cung cấp" : "Vận chuyển"}
          </p>
          
          {/* First certification badge */}
          {organization.certifications && organization.certifications.length > 0 && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                {organization.certifications[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// Registration/Feedback Modal
function FeedbackModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    requestType: "register",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        requestType: "register",
        details: "",
      });
      setUploadedFiles([]);
    }
  }, [open]);

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...fileNames].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success(
      formData.requestType === "register"
        ? "Đăng ký cơ sở thành công! Chúng tôi sẽ liên hệ trong 24h."
        : "Phản ánh đã được gửi! Cảm ơn bạn đã đóng góp.",
      {
        description: "Mã tiếp nhận: #ATTP-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        duration: 5000,
      }
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent 
            className="sm:max-w-xl bg-card/98 backdrop-blur-2xl border-border/40 p-0 overflow-hidden shadow-2xl"
            showCloseButton={false}
          >
            {/* Premium Header with Government Seal Effect */}
            <div className="relative">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
              
              {/* Header content */}
              <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">
                {/* Official badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="absolute top-4 right-4"
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">Chính thức</span>
                  </div>
                </motion.div>

                <DialogHeader className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                      <FileWarning className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold text-foreground">
                        Đăng ký / Phản ánh ATTP
                      </DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                        Cổng tiếp nhận thông tin An toàn Thực phẩm Hà Nội
                      </DialogDescription>
                    </div>
                  </motion.div>
                </DialogHeader>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
              {/* Request Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Loại yêu cầu
                </Label>
                <RadioGroup
                  value={formData.requestType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, requestType: value })
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  <Label
                    htmlFor="register"
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.requestType === "register"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="register" id="register" />
                    <div className="flex items-center gap-2">
                      <Building2 className={`w-4 h-4 ${formData.requestType === "register" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${formData.requestType === "register" ? "text-foreground" : "text-muted-foreground"}`}>
                        Đăng ký cơ sở
                      </span>
                    </div>
                  </Label>
                  <Label
                    htmlFor="report"
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.requestType === "report"
                        ? "border-destructive bg-destructive/5 shadow-sm"
                        : "border-border hover:border-destructive/30 hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="report" id="report" />
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${formData.requestType === "report" ? "text-destructive" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${formData.requestType === "report" ? "text-foreground" : "text-muted-foreground"}`}>
                        Phản ánh vi phạm
                      </span>
                    </div>
                  </Label>
                </RadioGroup>
              </motion.div>

              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    Họ và tên <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Nhập họ và tên"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                    className="h-11 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    Số điện thoại <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0xxx xxx xxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="h-11 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors"
                  />
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="address" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  Địa chỉ cơ sở / địa điểm <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                  className="h-11 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors"
                />
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-2"
              >
                <Label htmlFor="details" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  Nội dung chi tiết <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="details"
                  placeholder={
                    formData.requestType === "register"
                      ? "Mô tả về cơ sở kinh doanh, loại hình, quy mô..."
                      : "Mô tả chi tiết về vi phạm, thời gian, tình trạng..."
                  }
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  required
                  rows={3}
                  className="rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors resize-none"
                />
              </motion.div>

              {/* File Upload */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  Hình ảnh đính kèm
                  <span className="text-xs text-muted-foreground font-normal">(Tùy chọn)</span>
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-border/60 rounded-xl p-4 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Kéo thả hoặc <span className="text-primary font-medium">chọn ảnh</span>
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      PNG, JPG tối đa 5 ảnh
                    </p>
                  </div>
                </div>
                
                {/* Uploaded files list */}
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {uploadedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-foreground truncate max-w-24">{file}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col-reverse sm:flex-row gap-3 pt-1"
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 h-11 rounded-xl border-border/60 hover:bg-muted/50"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 h-11 rounded-xl shadow-lg transition-all duration-200 ${
                    formData.requestType === "register"
                      ? "bg-primary hover:bg-primary/90 shadow-primary/25 hover:shadow-primary/35"
                      : "bg-destructive hover:bg-destructive/90 shadow-destructive/25 hover:shadow-destructive/35"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {formData.requestType === "register"
                        ? "Gửi đăng ký"
                        : "Gửi phản ánh"}
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4 pt-2"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Bảo mật thông tin</span>
                </div>
                <div className="w-px h-3 bg-border" />
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Xử lý trong 24h</span>
                </div>
              </motion.div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

function RestaurantDetailModal({
  restaurant,
  open,
  onClose,
  onSelectOrganization,
}: {
  restaurant: Restaurant | null;
  open: boolean;
  onClose: () => void;
  onSelectOrganization?: (org: Organization) => void;
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

          {/* Supply Chain Section */}
          {restaurant.supplyChain && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Chuỗi cung ứng thực phẩm
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pl-0">
                <SupplyChainBlock
                  organization={restaurant.supplyChain.supplier}
                  onClick={() => onSelectOrganization?.(restaurant.supplyChain.supplier)}
                />
                <SupplyChainBlock
                  organization={restaurant.supplyChain.transporter}
                  onClick={() => onSelectOrganization?.(restaurant.supplyChain.transporter)}
                />
              </div>
            </motion.div>
          )}

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

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Kiểm tra: {restaurant.inspectionDate}</span>
          </div>

          {/* Supply Chain Blocks */}
          {restaurant.supplyChain && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/60 group/block">
                <p className="text-xs text-muted-foreground font-medium">Cung cấp</p>
                <p className="text-xs font-semibold text-foreground mt-1 truncate">
                  {restaurant.supplyChain.supplier.avatar} {restaurant.supplyChain.supplier.name.split(" ")[0]}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/60 group/block">
                <p className="text-xs text-muted-foreground font-medium">Vận chuyển</p>
                <p className="text-xs font-semibold text-foreground mt-1 truncate">
                  {restaurant.supplyChain.transporter.avatar} {restaurant.supplyChain.transporter.name.split(" ")[0]}
                </p>
              </div>
            </div>
          )}
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
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

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
              onClick={() => setIsFeedbackModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <FileWarning className="mr-2 w-4 h-4" />
              Đăng ký / Phản ánh ATTP
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
                An toàn
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
                Vi phạm
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
            Xem tất cả
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        open={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onSelectOrganization={setSelectedOrganization}
      />

      {/* Organization Detail Modal */}
      <OrganizationModal
        org={selectedOrganization}
        open={!!selectedOrganization}
        onClose={() => setSelectedOrganization(null)}
      />

      {/* Feedback/Registration Modal */}
      <FeedbackModal
        open={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </section>
  );
}
