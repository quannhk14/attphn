"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Utensils,
  Newspaper,
  MapPin,
  Shield,
  AlertTriangle,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  searchAllFull,
  addRecentSearch,
  type GroupedSearchResults,
  type SearchResult,
} from "@/lib/search-utils";
import { type FoodPlace } from "@/lib/map-data";
import { type NewsArticle } from "@/lib/news-data";

type TabType = "all" | "places" | "news";

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [results, setResults] = useState<GroupedSearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      addRecentSearch(query);
      // Simulate async search
      const timer = setTimeout(() => {
        const searchResults = searchAllFull(query);
        setResults(searchResults);
        setIsLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setResults(null);
      setIsLoading(false);
    }
  }, [query]);

  const getFilteredResults = (): SearchResult[] => {
    if (!results) return [];
    switch (activeTab) {
      case "places":
        return results.places;
      case "news":
        return results.news;
      default:
        return [...results.places, ...results.news, ...results.districts];
    }
  };

  const filteredResults = getFilteredResults();

  const tabs = [
    { id: "all" as TabType, label: "Tất cả", count: results?.total || 0 },
    { id: "places" as TabType, label: "Địa điểm", count: results?.places.length || 0 },
    { id: "news" as TabType, label: "Tin tức", count: results?.news.length || 0 },
  ];

  if (!query) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Tìm kiếm</h1>
          <p className="text-muted-foreground">
            Nhập từ khóa để tìm kiếm nhà hàng, quán ăn, tin tức về an toàn thực phẩm
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Kết quả tìm kiếm
        </h1>
        <p className="text-muted-foreground">
          {isLoading ? (
            "Đang tìm kiếm..."
          ) : (
            <>
              Tìm thấy <span className="font-semibold text-foreground">{results?.total || 0}</span> kết quả cho "
              <span className="font-semibold text-foreground">{query}</span>"
            </>
          )}
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-muted animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ResultCard result={result} query={query} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Không tìm thấy kết quả
          </h2>
          <p className="text-muted-foreground mb-6">
            Không có kết quả phù hợp với "{query}". Thử tìm kiếm với từ khóa khác.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="rounded-full"
          >
            Về trang chủ
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// Result Card Component
function ResultCard({ result, query }: { result: SearchResult; query: string }) {
  if (result.type === "place") {
    return <PlaceResultCard result={result} query={query} />;
  }
  if (result.type === "news") {
    return <NewsResultCard result={result} query={query} />;
  }
  return <DistrictResultCard result={result} query={query} />;
}

function PlaceResultCard({ result, query }: { result: SearchResult; query: string }) {
  const place = result.data as FoodPlace;
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "safe":
        return {
          label: "An toàn",
          bgColor: "bg-primary/10",
          textColor: "text-primary",
          icon: Shield,
        };
      case "violation":
        return {
          label: "Vi phạm",
          bgColor: "bg-destructive/10",
          textColor: "text-destructive",
          icon: AlertTriangle,
        };
      default:
        return {
          label: "Đang xem xét",
          bgColor: "bg-secondary/50",
          textColor: "text-secondary-foreground",
          icon: Clock,
        };
    }
  };

  const statusConfig = getStatusConfig(place.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Link href={result.url}>
      <div className="group p-4 sm:p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Utensils className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {result.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {place.address}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
              >
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                {place.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                {place.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsResultCard({ result, query }: { result: SearchResult; query: string }) {
  const article = result.data as NewsArticle;

  return (
    <Link href={result.url}>
      <div className="group p-4 sm:p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-secondary-foreground flex-shrink-0 text-2xl">
            {article.image}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {result.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function DistrictResultCard({ result, query }: { result: SearchResult; query: string }) {
  return (
    <Link href={result.url}>
      <div className="group p-4 sm:p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {result.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {result.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Xem bản đồ</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}
