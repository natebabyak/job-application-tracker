import { z } from "zod";

export const applicationStatuses = [
  "accepted",
  "declined",
  "interviewing",
  "offered",
  "rejected",
  "submitted",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export const ApplicationSchema = z.object({
  position: z
    .string()
    .trim()
    .min(1, "Position is required")
    .max(255, "Position is too long"),
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(255, "Company is too long"),
  submitted_on: z.date(),
  status: z.enum(applicationStatuses),
});

export type Application = z.infer<typeof ApplicationSchema>;

export type ApplicationWithId = {
  position: string;
  company: string;
  submitted_on: string;
  status: ApplicationStatus;
  id: string;
};
