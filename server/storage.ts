import { db } from "./db";
import {
  events,
  fundraisingStatus,
  fundraisingGoals,
  sponsorshipTiers,
  faqs,
  type Event,
  type FundraisingStatus,
  type FundraisingGoal,
  type SponsorshipTier,
  type Faq,
  type InsertEvent,
  type InsertFundraisingStatus,
  type InsertFundraisingGoal,
  type InsertSponsorshipTier,
  type InsertFaq,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getFundraisingStatus(): Promise<FundraisingStatus | undefined>;
  getFundraisingGoals(): Promise<FundraisingGoal[]>;
  getSponsorshipTiers(): Promise<SponsorshipTier[]>;
  getFaqs(): Promise<Faq[]>;
  
  // Seed/Admin methods
  createEvent(event: InsertEvent): Promise<Event>;
  setFundraisingStatus(status: InsertFundraisingStatus): Promise<FundraisingStatus>;
  createFundraisingGoal(goal: InsertFundraisingGoal): Promise<FundraisingGoal>;
  createSponsorshipTier(tier: InsertSponsorshipTier): Promise<SponsorshipTier>;
  createFaq(faq: InsertFaq): Promise<Faq>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getFundraisingStatus(): Promise<FundraisingStatus | undefined> {
    const [status] = await db.select().from(fundraisingStatus).limit(1);
    return status;
  }

  async getFundraisingGoals(): Promise<FundraisingGoal[]> {
    return await db.select().from(fundraisingGoals);
  }

  async getSponsorshipTiers(): Promise<SponsorshipTier[]> {
    return await db.select().from(sponsorshipTiers);
  }

  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  async setFundraisingStatus(status: InsertFundraisingStatus): Promise<FundraisingStatus> {
    // Ideally update existing or insert new, for now just insert/return
    const [newStatus] = await db.insert(fundraisingStatus).values(status).returning();
    return newStatus;
  }

  async createFundraisingGoal(goal: InsertFundraisingGoal): Promise<FundraisingGoal> {
    const [newGoal] = await db.insert(fundraisingGoals).values(goal).returning();
    return newGoal;
  }

  async createSponsorshipTier(tier: InsertSponsorshipTier): Promise<SponsorshipTier> {
    const [newTier] = await db.insert(sponsorshipTiers).values(tier).returning();
    return newTier;
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }
}

export const storage = new DatabaseStorage();
