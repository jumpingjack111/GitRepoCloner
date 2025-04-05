import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Study Session Schedule Schema
export const studySessionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  phaseId: z.string().min(1, "Phase selection is required"),
  objective: z.string().min(1, "Objective is required"),
  startDate: z.date(),
  endDate: z.date(),
  duration: z.number().min(5, "Session should be at least 5 minutes"),
  reminderEnabled: z.boolean().default(false),
  reminderTime: z.date().optional(),
  notes: z.string().optional(),
  completed: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export type StudySession = z.infer<typeof studySessionSchema>;
