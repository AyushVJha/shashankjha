import { z } from "zod";

export const PURPOSES = [
  "Legal Consultation",
  "General Inquiry",
  "Media / Interview",
  "Collaboration",
] as const;

export type Purpose = (typeof PURPOSES)[number];

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .max(30, "Phone is too long")
    .optional()
    .refine(
      (v) => !v || v.trim() === "" || phoneRegex.test(v.replace(/[\s-]/g, "")),
      { message: "Phone must be in E.164 format (e.g., +919876543210)" }
    ),
  purpose: z.enum(PURPOSES, { message: "Please select a purpose" }),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be at most 200 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be at most 5000 characters"),
  website: z
    .string()
    .max(0, "Bot detected")
    .optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
