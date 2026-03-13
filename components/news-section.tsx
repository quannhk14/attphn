"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsArticles = [
  {
    id: 1,
    title: "Tiêu chuẩn an toàn thực phẩm mới tại Phố Cổ",
    excerpt:
      "Sở An toàn thực phẩm đã triển khai hướng dẫn toàn diện mới cho các nhà hàng tại quận Hoàn Kiếm lịch sử.",
    date: "12/03/2026",
    readTime: "4 phút",
    image: "📋",
    category: "Quy định",
  },
  {
    id: 2,
    title: "Top 10 quán ăn đường phố được chứng nhận tại Hà Nội",
    excerpt:
      "Khám phá những quán ăn đường phố đạt chứng nhận an toàn cao nhất từ thanh tra thành phố.",
    date: "10/03/2026",
    readTime: "6 phút",
    image: "🍜",
    category: "Nổi bật",
  },
  {
    id: 3,
    title: "Báo cáo kiểm tra tháng 2/2026",
    excerpt:
      "Tổng quan về các đợt kiểm tra an toàn thực phẩm tại 12 quận trong tháng qua.",
    date: "08/03/2026",
    readTime: "8 phút",
    image: "📊",
    category: "Báo cáo",
  },
  {
    id: 4,
    title: "Cách nhận biết cơ sở ăn uống an toàn",
    excerpt:
      "Hướng dẫn giúp người dân nhận biết các nhà hàng và quán ăn được chứng nhận an toàn.",
    date: "05/03/2026",
    readTime: "5 phút",
    image: "✅",
    category: "Hướng dẫn",
  },
  {
    id: 5,
    title: "Hội thảo an toàn thực phẩm thành công tại Đống Đa",
    excerpt:
      "Hơn 200 chủ nhà hàng tham dự khóa đào tạo về vệ sinh an toàn thực phẩm.",
    date: "03/03/2026",
    readTime: "3 phút",
    image: "👨‍🍳",
    category: "Sự kiện",
  },
  {
    id: 6,
    title: "Ứng dụng di động mới cảnh báo an toàn thực phẩm",
    excerpt:
      "Người dân có thể nhận thông báo tức thì về cập nhật an toàn thực phẩm trong khu vực.",
    date: "01/03/2026",
    readTime: "4 phút",
    image: "📱",
    category: "Công nghệ",
  },
];

function NewsCard({
  article,
  index,
}: {
  article: (typeof newsArticles)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
        <motion.span
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-5xl"
        >
          {article.image}
        </motion.span>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
          {article.category}
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// Skeleton Loader
function NewsSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-4">
        <div className="h-5 bg-muted rounded w-full" />
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="flex gap-4">
          <div className="h-3 bg-muted rounded w-20" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function NewsSection() {
  return (
    <section id="news" className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Tin tức an toàn thực phẩm
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Cập nhật các quy định, báo cáo kiểm tra và tin tức cộng đồng
            mới nhất về an toàn thực phẩm
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
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
            className="rounded-full px-8 border-border hover:bg-card"
          >
            Xem tất cả tin tức
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
