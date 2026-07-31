"use server";

import type { EntityName } from "@/types";
import { createInquiry, deleteInquiry, listInquiries, updateInquiry } from "./inquiryService";
import { createProject, deleteProject, listProjects, updateProject } from "./projectService";
import { createReview, deleteReview, listReviews, updateReview } from "./reviewService";

import { createSocialLink, deleteSocialLink, listSocialLinks, updateSocialLink } from "./socialLinkService";
import { createPost, deletePost, listPosts, updatePost } from "./postService";
import { createFaq, deleteFaq, listFaqs, updateFaq } from "./faqService";
import { createTeamMember, deleteTeamMember, listTeamMembers, updateTeamMember } from "./teamMemberService";
import { createService, deleteService, listServices, updateService } from "./serviceService";
import { createClient, deleteClient, listClients, updateClient } from "./clientService";

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
    case "posts":
      return listPosts();
    case "faqs":
      return listFaqs();
    case "team-members":
      return listTeamMembers();
    case "services":
      return listServices();
    case "clients":
      return listClients();
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
    case "posts":
      return createPost(formData);
    case "faqs":
      return createFaq(formData);
    case "team-members":
      return createTeamMember(formData);
    case "services":
      return createService(formData);
    case "clients":
      return createClient(formData);
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
    case "posts":
      return updatePost(id, formData);
    case "faqs":
      return updateFaq(id, formData);
    case "team-members":
      return updateTeamMember(id, formData);
    case "services":
      return updateService(id, formData);
    case "clients":
      return updateClient(id, formData);
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
    case "posts":
      return deletePost(id);
    case "faqs":
      return deleteFaq(id);
    case "team-members":
      return deleteTeamMember(id);
    case "services":
      return deleteService(id);
    case "clients":
      return deleteClient(id);
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }
};
