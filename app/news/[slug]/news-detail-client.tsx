"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { NewsArticle } from "@/lib/news-data";

interface NewsDetailClientProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
}

function RelatedArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`}>
      <motion.article
        whileHover={{ y: -5 }}
        className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
            {article.image}
          </span>
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
            {article.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {article.date}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function NewsDetailClient({
  article,
  relatedArticles,
}: NewsDetailClientProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#news">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 rounded-full hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <span className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              {article.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance"
          >
            {article.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-6 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {article.author}
                </div>
                <div className="text-xs text-muted-foreground">
                  {article.authorRole}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative aspect-[21/9] rounded-3xl bg-gradient-to-br from-muted to-muted/50 border border-border/50 overflow-hidden flex items-center justify-center"
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-8xl sm:text-9xl"
            >
              {article.image}
            </motion.span>

            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-card/80 backdrop-blur-sm border-border/50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary"
            >
              {/* Excerpt */}
              <p className="text-xl text-foreground font-medium leading-relaxed !mt-0">
                {article.excerpt}
              </p>

              {/* Divider */}
              <div className="my-8 h-px bg-border" />

              {/* Rich Content */}
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2 [&_strong]:text-foreground"
              />
            </motion.article>

            {/* Sidebar - Related Articles */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Bài viết liên quan
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <RelatedArticleCard key={related.id} article={related} />
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/#news">
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-border hover:bg-muted"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tất cả tin tức
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border hover:bg-muted"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
