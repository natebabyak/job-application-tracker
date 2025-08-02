"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const applicationSchema = z.object({
  position: z.string(),
  company: z.string(),
  date: z.date(),
  status: z.enum([
    "accepted",
    "applied",
    "ghosted",
    "interviewing",
    "offered",
    "rejected",
    "withdrawn",
  ]),
});

export type Application = z.infer<typeof applicationSchema>;

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "position",
    header: "Position Title",
  },
  {
    accessorKey: "company",
    header: "Company Name",
  },
  {
    accessorKey: "date",
    header: "Application Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
