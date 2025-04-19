import { z } from "zod";

export const businessSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  companyNumber: z
    .string()
    .min(1, "Company Number is required")
    .regex(/^\d+$/, "Company Number must be a number"),
  country: z.string().min(1, "Country is required"),
  vatNumber: z
    .string()
    .min(1, "VAT Number is required")
    .regex(/^\d+$/, "VAT Number must be a number"),
  logo: z.any().optional(),
  address: z.string().min(1, "Address is required"),
  apptNo: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  postCode: z.string().optional(),
  primaryContactName: z.string().min(1, "Primary Contact Name is required"),
  primaryContactEmail: z
    .string()
    .min(1, "Primary Contact Email is required")
    .email("Invalid email address"),
  contactNumber: z
    .string()
    .min(1, "Contact Number is required")
    .regex(/^\d+$/, "Contact Number must be a number"),
  landline: z.string().optional(),
  profile: z.string().optional(),
  webAddress: z.string().optional(),
  linkedAccounts: z
    .array(
      z.object({
        profile: z.string().optional(),
        webAddress: z.string().optional(),
      })
    )
    .optional(),
  openingHours: z
    .array(
      z.object({
        day: z.string().min(1, "Day is required"),
        open: z.boolean(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
      })
    )
    .optional(),
  specialHours: z
    .array(
      z.object({
        date: z.string().optional(),
        open: z.boolean(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
      })
    )
    .optional(),
});
