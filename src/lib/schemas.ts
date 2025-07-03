import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export const createTimelineSchema = z.object({
  title: z.string().min(2),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export type CreateTimelineSchema = z.infer<typeof createTimelineSchema>;

export const createEventSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  date: z.date(),
  importance: z.number().min(1).max(5),
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;
