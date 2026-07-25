"use server";

import { listInquiries } from "./inquiryService";
import { listProjects } from "./projectService";
import { listReviews } from "./reviewService";
import { listSiteConfigs } from "./siteConfigService";
import { listSocialLinks } from "./socialLinkService";

export const getDashboardSummary = async () => {
  const [projects, reviews, inquiries, siteConfig, socialLinks] = await Promise.all([
    listProjects(),
    listReviews(),
    listInquiries(),
    listSiteConfigs(),
    listSocialLinks()
  ]);

  return {
    projects: projects.data ?? [],
    reviews: reviews.data ?? [],
    inquiries: inquiries.data ?? [],
    siteConfig: siteConfig.data ?? [],
    socialLinks: socialLinks.data ?? [],
    errors: [projects, reviews, inquiries, siteConfig, socialLinks]
      .filter((item) => !item.success)
      .map((item) => item.message)
  };
};

