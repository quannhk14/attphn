import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, newsArticles } from "@/lib/news-data";
import { NewsDetailClient } from "./news-detail-client";

export const dynamic = 'force-static';

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Khong tim thay bai viet",
    };
  }

  return {
    title: `${article.title} | An toan Thuc pham Ha Noi`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  return <NewsDetailClient article={article} relatedArticles={relatedArticles} />;
}
