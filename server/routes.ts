import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.events.list.path, async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get(api.fundraising.status.path, async (_req, res) => {
    const status = await storage.getFundraisingStatus();
    // Default fallback if not seeded yet, though we will seed it
    res.json(status || { currentAmount: 0, targetAmount: 1000000, percentage: 0 });
  });

  app.get(api.fundraising.goals.path, async (_req, res) => {
    const goals = await storage.getFundraisingGoals();
    res.json(goals);
  });

  app.get(api.sponsorship.tiers.path, async (_req, res) => {
    const tiers = await storage.getSponsorshipTiers();
    res.json(tiers);
  });

  app.get(api.faqs.list.path, async (_req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0) {
    console.log("Seeding database...");

    // 1. Fundraising Status
    await storage.setFundraisingStatus({
      currentAmount: 650000,
      targetAmount: 1000000,
      percentage: 65,
    });

    // 2. Fundraising Goals
    await storage.createFundraisingGoal({
      title: "系館設備更新",
      purpose: "提升學生學習環境，更新老舊電腦與投影設備。",
      expectedOutcome: "打造現代化、高效率的學術研討空間，惠及全體師生。",
    });
    await storage.createFundraisingGoal({
      title: "學術領袖論壇",
      purpose: "邀請國內外知名經濟學者進行講座與交流。",
      expectedOutcome: "拓展學生國際視野，提升台大經濟系的學術影響力。",
    });
    await storage.createFundraisingGoal({
      title: "國際交流補助",
      purpose: "資助優秀學生參與國際研討會與交換計畫。",
      expectedOutcome: "減輕學生經濟負擔，鼓勵走出台灣，與世界接軌。",
    });

    // 3. Sponsorship Tiers
    await storage.createSponsorshipTier({
      name: "均衡方案 (Equilibrium)",
      description: "象徵供需平衡的完美狀態，是支持系學會最穩定的力量。",
      items: ["電子感謝狀", "系學會年度刊物電子版"],
    });
    await storage.createSponsorshipTier({
      name: "消費者剩餘方案 (Consumer Surplus)",
      description: "獲得比預期更多的價值，物超所值的贊助選擇。",
      items: ["實體感謝狀", "2026 年度紀念帆布袋", "系學會限量貼紙組"],
    });
    await storage.createSponsorshipTier({
      name: "帕累托改進方案 (Pareto Improvement)",
      description: "讓所有人變得更好，追求群體最大福祉的頂級贊助。",
      items: ["精裝感謝狀", "2026 年度紀念系服", "VIP 活動邀請函", "紀念帆布袋"],
    });

    // 4. Events
    await storage.createEvent({
      title: "經濟之夜",
      date: "2026/05/20",
      description: "展現經濟系學生才華的年度盛會，戲劇、舞蹈、音樂的精彩碰撞。",
      imageUrl: "https://images.unsplash.com/photo-1514525253440-b393452e233e?auto=format&fit=crop&q=80&w=800",
    });
    await storage.createEvent({
      title: "系迎新營",
      date: "2026/08/15",
      description: "歡迎大一新生加入經濟系大家庭，三天兩夜的熱血回憶。",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    });
    await storage.createEvent({
      title: "職涯講座",
      date: "2026/10/12",
      description: "邀請金融、學術、科技業學長姐分享職涯經驗，指引未來方向。",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    });
    await storage.createEvent({
      title: "經濟盃",
      date: "2026/12/05",
      description: "熱血沸騰的體育競賽，凝聚系上向心力的最佳時刻。",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
    });

    // 5. FAQs
    await storage.createFaq({
      question: "贊助款項是否可以抵稅？",
      answer: "是的，我們會開立學校正式的捐款收據，可作為年度所得稅列舉扣除額之用。",
    });
    await storage.createFaq({
      question: "回饋品寄送時間為何？",
      answer: "預計於贊助截止後一個月內統一寄出。若有特殊需求請在表單備註。",
    });
    await storage.createFaq({
      question: "可以選擇自取回饋品嗎？",
      answer: "可以。自取地點為台大社科院經濟系系學會辦公室 (詳細時間將另行通知)。",
    });

    console.log("Database seeded successfully!");
  }
}
