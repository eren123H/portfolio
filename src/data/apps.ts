import {
  Folder,
  Layers,
  Terminal,
  UserRound,
  CodeXml,
  FileText,
  Settings,
} from "lucide-react";

export const apps = [
  {
    id: "finder",
    name: "Dosyalar",
    icon: Folder,
    color: "blue",
    description: "Biraz düzen. Keşfedecek çok şey.",
  },
  {
    id: "projects",
    name: "Projeler",
    icon: Layers,
    color: "violet",
    description: "Fikirler, denemeler ve geliştirdiklerim.",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: Terminal,
    color: "dark",
    description: "Merhaba demenin farklı bir yolu.",
  },
  {
    id: "about",
    name: "Hakkımda",
    icon: UserRound,
    color: "orange",
    description: "Piksellerin arkasındaki kişi.",
  },
  {
    id: "skills",
    name: "Yetenekler",
    icon: CodeXml,
    color: "green",
    description: "İşin arkasındaki araçlar.",
  },
  {
    id: "resume",
    name: "Özgeçmiş",
    icon: FileText,
    color: "paper",
    description: "Tek sayfada hikâyem.",
  },
  {
    id: "settings",
    name: "Ayarlar",
    icon: Settings,
    color: "gray",
    description: "Kendini evinde hisset.",
  },
] as const;

export type AppId = (typeof apps)[number]["id"];
export type DesktopApp = (typeof apps)[number];
