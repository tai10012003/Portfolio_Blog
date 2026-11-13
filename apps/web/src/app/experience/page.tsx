import type { Metadata } from "next";
import { ExperienceView } from "@/features/experience/experience-view";

export const metadata: Metadata = {
  title: "Kinh nghiệm | Pham Duc Tai",
  description: "Kinh nghiệm Web Developer tại XSUNT và Cloud Developer Intern trong First Cloud Journey Program tại AWS Vietnam của Pham Duc Tai.",
};

export default function ExperiencePage() {
  return <ExperienceView />;
}
