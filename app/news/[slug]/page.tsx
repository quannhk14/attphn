import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, newsArticles } from "@/lib/news-data";
import { NewsDetailClient } from "./news-detail-client";

export const dynamic = 'force-static';

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

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

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(params.slug, 3);

  return <NewsDetailClient article={article} relatedArticles={relatedArticles} />;
}
