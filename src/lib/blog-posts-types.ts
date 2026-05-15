import type { FeedCategory } from "./blog-feeds";

export type BlogPostStatus = "draft" | "in_review" | "approved" | "published";

export const STATUS_LABEL: Record<BlogPostStatus, string> = {
  draft: "Rascunho",
  in_review: "Em revisão",
  approved: "Aprovado",
  published: "Publicado",
};

export const ALL_STATUSES: BlogPostStatus[] = ["draft", "in_review", "approved", "published"];

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: FeedCategory;
  status: BlogPostStatus;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  review_notes: Record<string, unknown>;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeoCheckItem {
  id: string;
  label: string;
  pass: boolean;
  detail: string;
}

export interface SeoCheckReport {
  score: number; // 0-100
  passes: number;
  total: number;
  items: SeoCheckItem[];
  canPublish: boolean; // true se score >= 80
}
