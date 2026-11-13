import type { Metadata } from "next";
import { ProjectsView } from "@/features/projects/projects-view";

export const metadata: Metadata = {
  title: "Dự án | Pham Duc Tai",
  description: "Khám phá EasyTalk, SportElite và những đóng góp của Pham Duc Tai trong dự án Cobenfy tại XSUNT.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
