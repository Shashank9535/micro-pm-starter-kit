
import { TemplateSection } from "./types";

export const templateSections: TemplateSection[] = [
  {
    id: "overview",
    title: "Overview",
    description: "A brief summary of what the product/feature is and why it matters.",
    placeholder: "Briefly describe the purpose and scope of this PRD. What problem does it solve?",
  },
  {
    id: "background",
    title: "Background & Strategic Fit",
    description: "The context behind this initiative and how it aligns with company goals.",
    placeholder: "What's the history behind this need? How does it align with company strategy and goals?",
  },
  {
    id: "goals",
    title: "Goals & Success Metrics",
    description: "What this product/feature aims to achieve and how success will be measured.",
    placeholder: "List the key goals and metrics to track success (e.g., user engagement, conversion, etc.).",
  },
  {
    id: "user-problems",
    title: "User Problems & Use Cases",
    description: "The specific user needs this addresses and how users will interact with it.",
    placeholder: "Describe the specific user problems and needs this will address. Include user stories if applicable.",
  },
  {
    id: "requirements",
    title: "Functional Requirements",
    description: "The detailed specifications of what the product/feature must do.",
    placeholder: "List the key requirements and functionality this must deliver.",
  },
  {
    id: "design",
    title: "Design & User Experience",
    description: "The visual and interaction design specifications.",
    placeholder: "Describe the design approach, user flows, and key UX considerations.",
  },
  {
    id: "technical",
    title: "Technical Considerations",
    description: "Technical architecture, dependencies, and constraints.",
    placeholder: "What are the technical requirements, dependencies, or constraints to consider?",
  },
  {
    id: "timeline",
    title: "Timeline & Milestones",
    description: "The proposed schedule for development and release.",
    placeholder: "Outline the proposed timeline with key milestones and dependencies.",
  },
  {
    id: "risks",
    title: "Risks & Mitigations",
    description: "Potential issues and how they'll be addressed.",
    placeholder: "What are the potential risks, and how will they be mitigated?",
  },
  {
    id: "open-questions",
    title: "Open Questions",
    description: "Unresolved issues that need further research or discussion.",
    placeholder: "List any open questions or areas needing additional research.",
  },
];
