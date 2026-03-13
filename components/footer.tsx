"use client";

import { motion } from "framer-motion";
import { Shield, Utensils, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Nhà hàng an toàn", href: "#" },
    { label: "Bản đồ thực phẩm", href: "#" },
    { label: "Báo cáo kiểm tra", href: "#" },
    { label: "Tin tức", href: "#" },
  ],
  resources: [
    { label: "Hướng dẫn an toàn", href: "#" },
    { label: "Báo cáo vi phạm", href: "#" },
    { label: "Đăng ký nhà hàng", href: "#" },
    { label: "Câu hỏi thường gặp", href: "#" },
  ],
  districts: [
    "Hoàn Kiếm",
    "Ba Đình",
    "Đống Đa",
    "Hai Bà Trưng",
    "Cầu Giấy",
    "Thanh Xuân",
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "YouTube",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "Zalo",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.894c-.156.156-.364.234-.572.234h-.001a.805.805 0 0 1-.571-.235l-2.343-2.343a.806.806 0 0 1 0-1.143.808.808 0 0 1 1.143 0l1.772 1.772 3.878-3.878a.808.808 0 0 1 1.143 0 .806.806 0 0 1 0 1.143l-4.449 4.45zM6.5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0 2.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0 2.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z" />
      </svg>
    ),
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-background pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                  <Utensils className="w-2.5 h-2.5 text-secondary-foreground" />
                </div>
              </div>
              <span className="font-semibold text-background text-lg">
                An Toàn Thực Phẩm HN
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Nền tảng công nghệ dân sự đáng tin cậy giúp khám phá địa điểm
              ăn uống an toàn tại Hà Nội. Chúng tôi hỗ trợ người dân đưa ra
              quyết định thông minh qua dữ liệu minh bạch.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center text-background/70 hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-background mb-5">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-background mb-5">Tài nguyên</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-background mb-5">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-background/70">
                  Sở An toàn thực phẩm
                  <br />
                  Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-background/70">
                  +84 24 1900 0000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-background/70">
                  contact@hanoifoodsafety.gov.vn
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/50 text-center sm:text-left">
              © 2026 Cổng An Toàn Thực Phẩm Hà Nội. Mọi quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <a href="#" className="hover:text-primary transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Điều khoản dịch vụ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
