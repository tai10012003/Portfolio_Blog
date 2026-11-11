import type { Metadata } from "next";
import { AboutView } from "@/features/about/about-view";

export const metadata: Metadata = {
  title: "Giới thiệu | Pham Duc Tai",
  description: "Tìm hiểu về Pham Duc Tai, định hướng Fullstack Developer, cách làm việc và những kiến thức đang theo đuổi.",
};

export default function AboutPage() {
  return <AboutView />;
}
