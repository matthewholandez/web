export type Project = {
  name: string;
  description: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "Intelligo",
    description: "AI web novel translator",
    href: "https://github.com/matthewholandez/intelligo",
  },
  {
    name: "Wat Course",
    description: "academic advisor for UW students",
    href: "https://github.com/matthewholandez/wat-course",
  },
  {
    name: "AllOfOurVotes",
    description: "UN voting data visualizations",
    href: "https://allofourvotes.org",
  },
  {
    name: "Showdown",
    description: "LLM eval harness",
    href: "https://github.com/matthewholandez/showdown",
  },
];
