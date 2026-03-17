import { Suspense } from "react";
import { SearchPageClient } from "./search-page-client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Tìm kiếm - An Toàn Thực Phẩm Hà Nội",
  description: "Tìm kiếm nhà hàng, quán ăn, tin tức về an toàn thực phẩm tại Hà Nội",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 sm:pt-28 pb-16">
        <Suspense fallback={<SearchPageSkeleton />}>
          <SearchPageClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-8 w-48 bg-muted animate-pulse rounded-lg mb-6" />
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-full" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
