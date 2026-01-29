import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Events
export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path);
      if (!res.ok) throw new Error("Failed to fetch events");
      return api.events.list.responses[200].parse(await res.json());
    },
  });
}

// Fundraising Status
export function useFundraisingStatus() {
  return useQuery({
    queryKey: [api.fundraising.status.path],
    queryFn: async () => {
      const res = await fetch(api.fundraising.status.path);
      if (!res.ok) throw new Error("Failed to fetch fundraising status");
      return api.fundraising.status.responses[200].parse(await res.json());
    },
  });
}

// Fundraising Goals
export function useFundraisingGoals() {
  return useQuery({
    queryKey: [api.fundraising.goals.path],
    queryFn: async () => {
      const res = await fetch(api.fundraising.goals.path);
      if (!res.ok) throw new Error("Failed to fetch goals");
      return api.fundraising.goals.responses[200].parse(await res.json());
    },
  });
}

// Sponsorship Tiers
export function useSponsorshipTiers() {
  return useQuery({
    queryKey: [api.sponsorship.tiers.path],
    queryFn: async () => {
      const res = await fetch(api.sponsorship.tiers.path);
      if (!res.ok) throw new Error("Failed to fetch tiers");
      return api.sponsorship.tiers.responses[200].parse(await res.json());
    },
  });
}

// FAQs
export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return api.faqs.list.responses[200].parse(await res.json());
    },
  });
}
