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
});
