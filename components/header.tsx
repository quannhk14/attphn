"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Shield,
  Utensils,
  MapPin,
  Newspaper,
  Clock,
  TrendingUp,
  Loader2,
  ArrowRight,
  Compass,
  Map,
  Code2,
  Phone,
} from "lucide-react";
import {
  searchAll,
  highlightMatch,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  type GroupedSearchResults,
  type SearchResult,
} from "@/lib/search-utils";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Trending keywords (static)
const trendingKeywords = ["Phở", "Bún chả", "Hoàn Kiếm", "An toàn", "Vi phạm"];

// Search input with dropdown component
function SearchInput({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GroupedSearchResults | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setIsLoading(true);
      // Simulate async search (in real app this would be an API call)
      const timer = setTimeout(() => {
        const searchResults = searchAll(debouncedQuery, 3);
        setResults(searchResults);
        setIsLoading(false);
        setSelectedIndex(-1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setResults(null);
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all flat results for keyboard navigation
  const getAllResults = useCallback((): SearchResult[] => {
    if (!results) return [];
    return [...results.places, ...results.news, ...results.districts];
  }, [results]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allResults = getAllResults();

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, allResults.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && allResults[selectedIndex]) {
          navigateToResult(allResults[selectedIndex]);
        } else if (query.trim()) {
          navigateToSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const navigateToResult = (result: SearchResult) => {
    addRecentSearch(query);
    setRecentSearches(getRecentSearches());
    setIsOpen(false);
    setQuery("");
    router.push(result.url);
  };

  const navigateToSearch = () => {
    if (query.trim()) {
      addRecentSearch(query);
      setRecentSearches(getRecentSearches());
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const hasResults = results && results.total > 0;
  const showDropdown = isOpen && (query.length >= 2 || recentSearches.length > 0 || true);

  // Render highlighted text
  const renderHighlightedText = (text: string, maxLength?: number) => {
    const displayText = maxLength && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    const parts = highlightMatch(displayText, query);
    return parts.map((part, i) =>
      part.highlight ? (
        <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
          {part.text}
        </mark>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );
  };

  // Get result type icon
  const getResultIcon = (type: string) => {
    switch (type) {
      case "place":
        return <Utensils className="w-4 h-4" />;
      case "news":
        return <Newspaper className="w-4 h-4" />;
      case "district":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  // Calculate global index for keyboard navigation
  let globalIndex = 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`relative flex items-center rounded-full border transition-all duration-300 ${
          isOpen
            ? "border-primary bg-card shadow-lg shadow-primary/10"
            : "border-border bg-muted/50"
        }`}
      >
        <Search className="w-4 h-4 text-muted-foreground ml-4 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMobile ? "Tìm nhà hàng..." : "Tìm nhà hàng, quán ăn, quán cà phê..."}
          className="w-full py-2.5 px-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="mr-2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        {isLoading && (
          <Loader2 className="w-4 h-4 text-muted-foreground mr-4 animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {/* Loading state */}
            {isLoading && query.length >= 2 && (
              <div className="p-4 flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Đang tìm kiếm...</span>
              </div>
            )}

            {/* Results */}
            {!isLoading && hasResults && (
              <div className="max-h-80 overflow-y-auto">
                {/* Places */}
                {results.places.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Địa điểm
                    </div>
                    {results.places.map((result) => {
                      const currentIndex = globalIndex++;
                      return (
                        <button
                          key={result.id}
                          onClick={() => navigateToResult(result)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                            selectedIndex === currentIndex
                              ? "bg-primary/10"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {getResultIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {renderHighlightedText(result.title)}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {renderHighlightedText(result.subtitle, 50)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* News */}
                {results.news.length > 0 && (
                  <div className="p-2 border-t border-border/50">
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Tin tức
                    </div>
                    {results.news.map((result) => {
                      const currentIndex = globalIndex++;
                      return (
                        <button
                          key={result.id}
                          onClick={() => navigateToResult(result)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                            selectedIndex === currentIndex
                              ? "bg-primary/10"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-secondary-foreground flex-shrink-0">
                            {getResultIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {renderHighlightedText(result.title, 40)}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {renderHighlightedText(result.subtitle, 50)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Districts */}
                {results.districts.length > 0 && (
                  <div className="p-2 border-t border-border/50">
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Khu vực
                    </div>
                    {results.districts.map((result) => {
                      const currentIndex = globalIndex++;
                      return (
                        <button
                          key={result.id}
                          onClick={() => navigateToResult(result)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                            selectedIndex === currentIndex
                              ? "bg-primary/10"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                            {getResultIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground">
                              {renderHighlightedText(result.title)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result.subtitle}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* View all results */}
                {results.total > 0 && (
                  <div className="p-2 border-t border-border/50">
                    <button
                      onClick={navigateToSearch}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                    >
                      Xem tất cả {results.total} kết quả
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* No results */}
            {!isLoading && query.length >= 2 && !hasResults && (
              <div className="p-6 text-center">
                <Search className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Không tìm thấy kết quả cho "{query}"
                </p>
              </div>
            )}

            {/* Recent searches & Trending (when no query) */}
            {!isLoading && query.length < 2 && (
              <div className="p-2">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        <Clock className="w-3 h-3" />
                        Tìm kiếm gần đây
                      </div>
                      <button
                        onClick={handleClearRecent}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-3 py-1">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => handleRecentClick(term)}
                          className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending */}
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <TrendingUp className="w-3 h-3" />
                    Xu hướng tìm kiếm
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-3 py-1">
                    {trendingKeywords.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleTrendingClick(term)}
                        className="px-3 py-1.5 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Header Menu Dropdown Component
interface HeaderMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateNews?: () => void;
  onNavigateDiscover?: () => void;
  onNavigateMap?: () => void;
  onOpenLookup?: () => void;
}

function HeaderMenuDropdown({
  isOpen,
  onClose,
  onNavigateNews,
  onNavigateDiscover,
  onNavigateMap,
  onOpenLookup,
}: HeaderMenuDropdownProps) {
  const menuItems = [
    {
      label: "Tin tức ATTP",
      icon: Newspaper,
      onClick: onNavigateNews,
      color: "text-blue-500",
    },
    {
      label: "Khám phá",
      icon: Compass,
      onClick: onNavigateDiscover,
      color: "text-purple-500",
    },
    {
      label: "Bản đồ ATTP Hà Nội",
      icon: Map,
      onClick: onNavigateMap,
      color: "text-green-500",
    },
    {
      label: "Tra cứu mã",
      icon: Code2,
      onClick: onOpenLookup,
      color: "text-orange-500",
    },
    {
      label: "Hotline phản ánh ATTP",
      icon: Phone,
      onClick: () => {
        // In a real app, this could trigger a call or show contact info
        alert("Hotline: 1900 0096");
      },
      color: "text-red-500",
    },
  ];

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle click outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        // Check if click is on the menu button
        const menuButton = document.querySelector("[data-menu-button]");
        if (menuButton && !menuButton.contains(e.target as Node)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 right-0 w-full bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-2xl"
          style={{ transformOrigin: "top" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="py-3 space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => {
                      item.onClick?.();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-muted/80 transition-all duration-200 group"
                  >
                    <div className={`flex-shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-left text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigateNews = () => {
    router.push("/news");
  };

  const handleNavigateMap = () => {
    router.push("/map");
  };

  const handleNavigateDiscover = () => {
    // Scroll to food places section
    document.getElementById("food-places")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenLookup = () => {
    // This would trigger the lookup modal from the parent page
    // For now, we'll dispatch a custom event or use a portal
    const event = new CustomEvent("openLookupModal");
    document.dispatchEvent(event);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="/"
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
          </motion.a>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <SearchInput />
          </div>

          {/* Menu Button */}
          <motion.button
            data-menu-button
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
          <SearchInput isMobile />
        </div>
      </div>

      {/* Dropdown Menu */}
      <HeaderMenuDropdown
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateNews={handleNavigateNews}
        onNavigateMap={handleNavigateMap}
        onNavigateDiscover={handleNavigateDiscover}
        onOpenLookup={handleOpenLookup}
      />
    </motion.header>
  );
}
