import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(), // Placeholder image URL
});

export const fundraisingStatus = pgTable("fundraising_status", {
  id: serial("id").primaryKey(),
  currentAmount: integer("current_amount").notNull(),
  targetAmount: integer("target_amount").notNull(),
  percentage: integer("percentage").notNull(), // Can be calculated, but storing for simplicity if needed
});

export const fundraisingGoals = pgTable("fundraising_goals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  purpose: text("purpose").notNull(),
  expectedOutcome: text("expected_outcome").notNull(),
});

export const sponsorshipTiers = pgTable("sponsorship_tiers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  items: text("items").array().notNull(), // Array of reward items
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

// Schemas
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertFundraisingStatusSchema = createInsertSchema(fundraisingStatus).omit({ id: true });
export const insertFundraisingGoalSchema = createInsertSchema(fundraisingGoals).omit({ id: true });
export const insertSponsorshipTierSchema = createInsertSchema(sponsorshipTiers).omit({ id: true });
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });

// Types
export type Event = typeof events.$inferSelect;
export type FundraisingStatus = typeof fundraisingStatus.$inferSelect;
export type FundraisingGoal = typeof fundraisingGoals.$inferSelect;
export type SponsorshipTier = typeof sponsorshipTiers.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
