"use server";

import type { EntityName } from "@/types";
import { createInquiry, deleteInquiry, listInquiries, updateInquiry } from "./inquiryService";
import { createProject, deleteProject, listProjects, updateProject } from "./projectService";
import { createReview, deleteReview, listReviews, updateReview } from "./reviewService";

import { createSocialLink, deleteSocialLink, listSocialLinks, updateSocialLink } from "./socialLinkService";

export const listEntity = async (entity: EntityName) => {
  switch (entity) {
    case "projects":
      return listProjects();
    case "reviews":
      return listReviews();
    case "inquiries":
      return listInquiries();

    case "social-links":
      return listSocialLinks();
    default:
      throw new Error(`Unknown entity: ${entity}`);
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

    case "social-links":
      return createSocialLink(formData);
    default:
      throw new Error(`Unknown entity: ${entity}`);
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

    case "social-links":
      return updateSocialLink(id, formData);
    default:
      throw new Error(`Unknown entity: ${entity}`);
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

    case "social-links":
      return deleteSocialLink(id);
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }
};
