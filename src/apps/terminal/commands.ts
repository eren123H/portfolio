import {
  experiences,
  profile,
  projects,
  skillGroups,
} from "../../data/portfolio.js";

export const terminalCommands = [
  { name: "help", description: "Komutları ve açıklamalarını gösterir." },
  { name: "about", description: "Eren hakkında kısa bilgi verir." },
  {
    name: "projects",
    description: "Projeleri ve GitHub bağlantılarını gösterir.",
  },
  {
    name: "skills",
    description: "Teknik becerileri kategorileriyle listeler.",
  },
  { name: "clear", description: "Terminal ekranını temizler." },
] as const;

type CommandResult =
  | { type: "empty" }
  | { type: "clear" }
  | { type: "output"; lines: string[]; error?: boolean };

// Only these local portfolio commands are supported. Input is never evaluated.
export function runTerminalCommand(input: string): CommandResult {
  const command = input.trim().toLowerCase();

  switch (command) {
    case "":
      return { type: "empty" };
    case "clear":
      return { type: "clear" };
    case "help":
      return {
        type: "output",
        lines: [
          "Kullanılabilir komutlar:",
          ...terminalCommands.map(
            ({ name, description }) => `${name.padEnd(10)}${description}`,
          ),
          "",
          "Enter: çalıştır · ↑ / ↓: komut geçmişi",
        ],
      };
    case "about":
      return {
        type: "output",
        lines: [
          `Merhaba, ben ${profile.name}.`,
          profile.focusAreas.join(" • "),
          profile.summary,
          "",
          `${profile.education.university} | ${profile.education.degree} | ${profile.education.years}`,
          ...experiences.map(
            (experience) =>
              `${experience.company} — ${experience.role} (${experience.year})`,
          ),
          `${profile.location} | ${profile.language}`,
          ...profile.links.map(
            (link) => `${link.label}: ${link.href.replace("mailto:", "")}`,
          ),
        ],
      };
    case "projects":
      return {
        type: "output",
        lines: [
          ...projects.flatMap((project) => [
            project.title,
            project.summary,
            project.technologies.join(" · "),
            project.repository,
            "",
          ]),
        ],
      };
    case "skills":
      return {
        type: "output",
        lines: [
          ...skillGroups.flatMap((group) => [
            group.title,
            group.skills.join(" · "),
            group.evidence,
            "",
          ]),
          profile.language,
        ],
      };
    default:
      return {
        type: "output",
        error: true,
        lines: [
          `Komut bulunamadı: ${input.trim()}`,
          "Kullanılabilir komutları görmek için help yazabilirsin.",
        ],
      };
  }
}
