export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
};

export type AdminProfile = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  createdAt: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  techStack: string[];
  caseStudy?: string | null;
  liveLink?: string | null;
  isFeatured: boolean;
  order: number;
  createdAt: string;
};

export type Review = {
  id: string;
  clientName: string;
  designation: string;
  company?: string | null;
  avatar?: string | null;
  reviewText: string;
  rating: number;
  isFeatured: boolean;
  createdAt: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: string;
};

export type SiteConfig = {
  id: string;
  companyName: string;
  heroHeading?: string | null;
  heroSubheading?: string | null;
  slogan: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  updatedAt: string;
};

export type SocialLink = {
  id: string;
  platform: "WHATSAPP" | "FACEBOOK" | "LINKEDIN" | "TWITTER" | "INSTAGRAM" | "TIKTOK";
  url: string;
  isActive: boolean;
  createdAt: string;
};

export type EntityName = "projects" | "reviews" | "inquiries" | "social-links";
export type EntityRecord = Project | Review | Inquiry | SiteConfig | SocialLink;
