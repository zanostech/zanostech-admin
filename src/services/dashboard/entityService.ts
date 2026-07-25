"use server";

import type { EntityName } from "@/types";
import { createInquiry, deleteInquiry, listInquiries, updateInquiry } from "./inquiryService";
import { createProject, deleteProject, listProjects, updateProject } from "./projectService";
import { createReview, deleteReview, listReviews, updateReview } from "./reviewService";
import { createSiteConfig, deleteSiteConfig, listSiteConfigs, updateSiteConfig } from "./siteConfigService";
import { createSocialLink, deleteSocialLink, listSocialLinks, updateSocialLink } from "./socialLinkService";

export const listEntity = async (entity: EntityName) => {
  switch (entity) {
    case "projects":
      return listProjects();
    case "reviews":
      return listReviews();
    case "inquiries":
      return listInquiries();
    case "site-config":
      return listSiteConfigs();
    case "social-links":
      return listSocialLinks();
  }
};

export const createEntity = async (entity: EntityName, formData: FormData) => {
  switch (entity) {
    case "projects":
      return createProject(formData);
    case "reviews":
      return createReview(formData);
    case "inquiries":
      return createInquiry();
    case "site-config":
      return createSiteConfig(formData);
    case "social-links":
      return createSocialLink(formData);
  }
};

export const updateEntity = async (entity: EntityName, id: string, formData: FormData) => {
  switch (entity) {
    case "projects":
      return updateProject(id, formData);
    case "reviews":
      return updateReview(id, formData);
    case "inquiries":
      return updateInquiry(id, formData);
    case "site-config":
      return updateSiteConfig(id, formData);
    case "social-links":
      return updateSocialLink(id, formData);
  }
};

export const deleteEntity = async (entity: EntityName, id: string) => {
  switch (entity) {
    case "projects":
      return deleteProject(id);
    case "reviews":
      return deleteReview(id);
    case "inquiries":
      return deleteInquiry();
    case "site-config":
      return deleteSiteConfig(id);
    case "social-links":
      return deleteSocialLink(id);
  }
};
