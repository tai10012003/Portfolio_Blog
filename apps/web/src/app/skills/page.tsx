import type { Metadata } from "next";
import { SkillsView } from "@/features/skills/skills-view";

export const metadata: Metadata = {
  title: "Kỹ năng | Pham Duc Tai",
  description: "Kỹ năng của Pham Duc Tai: phát triển web, Coding Agent, review code, giao tiếp, làm việc nhóm và tư duy giải quyết vấn đề.",
};

export default function SkillsPage() {
  return <SkillsView />;
}
