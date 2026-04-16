export type ProjectStatus = "live" | "completed" | "coming-soon";

export interface Project {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  featured: boolean;
  stack: string[];
  url: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Example App #1",
    description:
      "An AI-powered tool built live on stream. Full agentic workflow, deployed and shareable.",
    status: "live",
    featured: true,
    stack: ["Next.js", "Claude API"],
    url: "#",
  },
  {
    id: 2,
    title: "Support Copilot",
    description:
      "A lean support workflow prototype that shows how agents can draft, route, and summarize tickets.",
    status: "completed",
    featured: false,
    stack: ["React", "Tailwind", "OpenAI"],
    url: "#",
  },
  {
    id: 3,
    title: "Ops Dashboard",
    description:
      "A clean internal operations dashboard focused on live metrics, audit trails, and rapid iteration.",
    status: "completed",
    featured: false,
    stack: ["Next.js", "TypeScript"],
    url: "#",
  },
  {
    id: 4,
    title: "Lead Intake Agent",
    description:
      "An example sales intake workflow that turns raw inbound messages into structured follow-up tasks.",
    status: "coming-soon",
    featured: false,
    stack: ["Agents", "Automation"],
    url: "#",
  },
  {
    id: 5,
    title: "Creator Toolkit",
    description:
      "A public-facing microsite template for launching experiments, tracking builds, and showing traction.",
    status: "completed",
    featured: false,
    stack: ["Next.js", "Vercel"],
    url: "#",
  },
  {
    id: 6,
    title: "Realtime Demo Board",
    description:
      "A build-in-public control room concept for showcasing AI agents working through live product tasks.",
    status: "coming-soon",
    featured: false,
    stack: ["UI Systems", "Streaming"],
    url: "#",
  },
];
