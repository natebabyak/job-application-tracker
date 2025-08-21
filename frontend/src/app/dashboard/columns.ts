"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const applicationSchema = z.object({
  position: z.string(),
  company: z.string(),
  submittedOn: z.date(),
  status: z.enum([
    "accepted",
    "declined",
    "interviewing",
    "offered",
    "rejected",
    "submitted",
  ]),
});

export type Application = z.infer<typeof applicationSchema>;

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "submittedOn",
    header: "Submitted On",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
