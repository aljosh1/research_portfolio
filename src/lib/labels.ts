import type { ProjectStatus, PublicationStatus, PublicationType, TimelineKind } from "@/generated/prisma/client";

export const publicationTypeLabels: Record<PublicationType, string> = {
  JOURNAL_ARTICLE: "Journal article",
  CONFERENCE_PAPER: "Conference paper",
  BOOK: "Book",
  EDITED_BOOK: "Edited book",
  BOOK_CHAPTER: "Book chapter",
  REVIEW_ARTICLE: "Review article",
  PREPRINT: "Preprint",
  TECHNICAL_REPORT: "Technical report",
  WORKING_PAPER: "Working paper",
  THESIS: "Thesis / dissertation",
  PATENT: "Patent",
  OTHER: "Other",
};

export const publicationStatusLabels: Record<PublicationStatus, string> = {
  PUBLISHED: "Published",
  ACCEPTED: "Accepted",
  SUBMITTED: "Submitted",
  PREPRINT: "Preprint",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  PLANNED: "Planned",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
};

export const timelineKindLabels: Record<TimelineKind, string> = {
  QUALIFICATION: "Qualification",
  APPOINTMENT: "Appointment / employment",
  TEACHING: "Teaching",
  AWARD: "Award / honour",
  MEMBERSHIP: "Professional membership",
  LEADERSHIP: "Academic leadership",
  SERVICE: "Professional service / editorial",
};

export const publicationTypes = Object.keys(publicationTypeLabels) as PublicationType[];
export const publicationStatuses = Object.keys(publicationStatusLabels) as PublicationStatus[];
export const projectStatuses = Object.keys(projectStatusLabels) as ProjectStatus[];
export const timelineKinds = Object.keys(timelineKindLabels) as TimelineKind[];
