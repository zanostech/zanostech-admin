import { FolderKanban, LayoutDashboard, Link2, Mail, MessageSquareQuote, Settings, FileText, HelpCircle, Users, Briefcase, Building } from "lucide-react";

export const NAV_SECTIONS = [
  {
    section: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
  },
  {
    section: "CONTENT",
    items: [
      { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
      { label: "Reviews", href: "/dashboard/reviews", icon: MessageSquareQuote },
      { label: "Inquiries", href: "/dashboard/inquiries", icon: Mail },
      { label: "Posts", href: "/dashboard/posts", icon: FileText },
      { label: "FAQs", href: "/dashboard/faqs", icon: HelpCircle },
      { label: "Team Members", href: "/dashboard/team-members", icon: Users },
      { label: "Services", href: "/dashboard/services", icon: Briefcase },
      { label: "Clients", href: "/dashboard/clients", icon: Building }
    ]
  },
  {
    section: "SETTINGS",
    items: [
      { label: "Site Config", href: "/dashboard/site-config", icon: Settings },
      { label: "Social Links", href: "/dashboard/social-links", icon: Link2 }
    ]
  }
];