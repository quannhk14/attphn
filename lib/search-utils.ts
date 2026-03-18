import { foodPlaces, districts, type FoodPlace, type District } from "./map-data";
import { newsArticles, type NewsArticle } from "./news-data";

export type SearchResultType = "place" | "news" | "district";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  url: string;
  data: FoodPlace | NewsArticle | District;
}

// Remove Vietnamese diacritics for better matching
function removeVietnameseDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Check if query matches text (Vietnamese-friendly)
function matchesQuery(text: string, query: string): boolean {
  const normalizedText = removeVietnameseDiacritics(text.toLowerCase());
  const normalizedQuery = removeVietnameseDiacritics(query.toLowerCase());
  return normalizedText.includes(normalizedQuery);
}

// Highlight matched text
export function highlightMatch(text: string, query: string): { text: string; highlight: boolean }[] {
  if (!query || query.length < 2) return [{ text, highlight: false }];
  
  const normalizedText = removeVietnameseDiacritics(text.toLowerCase());
  const normalizedQuery = removeVietnameseDiacritics(query.toLowerCase());
  
  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) return [{ text, highlight: false }];
  
  const result: { text: string; highlight: boolean }[] = [];
  
  if (index > 0) {
    result.push({ text: text.slice(0, index), highlight: false });
  }
  result.push({ text: text.slice(index, index + query.length), highlight: true });
  if (index + query.length < text.length) {
    result.push({ text: text.slice(index + query.length), highlight: false });
  }
  
  return result;
}

// Search food places
export function searchFoodPlaces(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  
  return foodPlaces
    .filter(
      (place) =>
        matchesQuery(place.name, query) ||
        matchesQuery(place.address, query) ||
        matchesQuery(place.district, query) ||
        matchesQuery(place.type, query)
    )
    .map((place) => ({
      id: `place-${place.id}`,
      type: "place" as SearchResultType,
      title: place.name,
      subtitle: place.address,
      url: `/map?place=${place.id}`,
      data: place,
    }));
}

// Search news articles
export function searchNews(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  
  return newsArticles
    .filter(
      (article) =>
        matchesQuery(article.title, query) ||
        matchesQuery(article.excerpt, query) ||
        matchesQuery(article.category, query)
    )
    .map((article) => ({
      id: `news-${article.id}`,
      type: "news" as SearchResultType,
      title: article.title,
      subtitle: article.excerpt,
      url: `/news/${article.slug}`,
      data: article,
    }));
}

// Search districts
export function searchDistricts(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  
  return districts
    .filter((district) => matchesQuery(district.name, query))
    .map((district) => ({
      id: `district-${district.id}`,
      type: "district" as SearchResultType,
      title: district.name,
      subtitle: `${district.safeCount} cơ sở an toàn`,
      url: `/map?district=${district.id}`,
      data: district,
    }));
}

// Combined search with grouping
export interface GroupedSearchResults {
  places: SearchResult[];
  news: SearchResult[];
  districts: SearchResult[];
  total: number;
}

export function searchAll(query: string, limit?: number): GroupedSearchResults {
  const places = searchFoodPlaces(query);
  const news = searchNews(query);
  const districtsResults = searchDistricts(query);
  
  const itemLimit = limit || 5;
  
  return {
    places: places.slice(0, itemLimit),
    news: news.slice(0, itemLimit),
    districts: districtsResults.slice(0, itemLimit),
    total: places.length + news.length + districtsResults.length,
  };
}

// Full search for results page
export function searchAllFull(query: string): GroupedSearchResults {
  const places = searchFoodPlaces(query);
  const news = searchNews(query);
  const districtsResults = searchDistricts(query);
  
  return {
    places,
    news,
    districts: districtsResults,
    total: places.length + news.length + districtsResults.length,
  };
}

// Recent searches storage key
const RECENT_SEARCHES_KEY = "attphn_recent_searches";
const MAX_RECENT_SEARCHES = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === "undefined" || !query.trim()) return;
  try {
    const recent = getRecentSearches();
    const filtered = recent.filter((s) => s.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Ignore localStorage errors
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Ignore localStorage errors
  }
}
