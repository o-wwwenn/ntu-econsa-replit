import { z } from 'zod';
import { events, fundraisingStatus, fundraisingGoals, sponsorshipTiers, faqs } from './schema';

export const api = {
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },
  fundraising: {
    status: {
      method: 'GET' as const,
      path: '/api/fundraising/status',
      responses: {
        200: z.custom<typeof fundraisingStatus.$inferSelect>(),
      },
    },
    goals: {
      method: 'GET' as const,
      path: '/api/fundraising/goals',
      responses: {
        200: z.array(z.custom<typeof fundraisingGoals.$inferSelect>()),
      },
    },
  },
  sponsorship: {
    tiers: {
      method: 'GET' as const,
      path: '/api/sponsorship/tiers',
      responses: {
        200: z.array(z.custom<typeof sponsorshipTiers.$inferSelect>()),
      },
    },
  },
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs',
      responses: {
        200: z.array(z.custom<typeof faqs.$inferSelect>()),
      },
    },
  },
};
