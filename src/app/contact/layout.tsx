import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Contact",
  "Collaborate on a project, chat about agentic AI workflows, or say hello.",
  "/contact",
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
