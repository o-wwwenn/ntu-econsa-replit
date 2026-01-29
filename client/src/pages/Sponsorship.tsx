import { useSponsorshipTiers } from "@/hooks/use-resources";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, Crown, Star, Shield } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

function TiersLoading() {
  return (
    <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse" />)}
    </div>
  );
}

export default function Sponsorship() {
  const { data: tiers, isLoading } = useSponsorshipTiers();

  if (isLoading) return <TiersLoading />;

  const getTierIcon = (name: string) => {
    if (name.includes("帕累托")) return Crown;
    if (name.includes("消費者")) return Star;
    return Shield;
  };

  const getTierColor = (name: string) => {
    if (name.includes("帕累托")) return "border-accent bg-accent/5";
    if (name.includes("消費者")) return "border-primary/50 bg-primary/5";
    return "border-border bg-card";
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">贊助回饋方案</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            您的慷慨解囊，我們以精心設計的紀念品銘記於心。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {tiers?.map((tier, index) => {
            const Icon = getTierIcon(tier.name);
            const isPremium = tier.name.includes("帕累托");
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 border-2 ${getTierColor(tier.name)} ${isPremium ? 'shadow-xl shadow-accent/10 scale-105 z-10' : 'shadow-lg'}`}>
                  {isPremium && (
                    <div className="absolute top-0 right-0 bg-accent text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      最受歡迎
                    </div>
                  )}
                  <CardHeader className="text-center pb-2 pt-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-background border-2 border-primary/10 flex items-center justify-center mb-4 text-primary shadow-sm">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-primary">{tier.name}</CardTitle>
                    <p className="text-muted-foreground mt-2 min-h-[3rem]">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4 mt-4">
                      {tier.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-8 pb-8">
                    <Link href="/how-to" className="w-full">
                      <Button className={`w-full text-lg py-6 rounded-xl ${isPremium ? 'bg-accent hover:bg-accent/90 text-primary' : 'bg-primary hover:bg-primary/90'}`}>
                        選擇此方案
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Design Concept Section */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-accent">設計理念</h2>
              <p className="text-lg leading-relaxed text-blue-100 mb-6">
                今年的回饋品設計，我們將供需曲線的幾何美感融入系服線條，並選用象徵「理性與感性兼具」的深藍與燙金配色。
              </p>
              <p className="text-lg leading-relaxed text-blue-100">
                帆布袋則印有亞當·史密斯的經典名言，時刻提醒我們作為經濟人的初衷與使命。每一個細節，都是為了讓身為台大經濟人的您感到驕傲。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Using Unsplash for concept placeholders */}
              <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20">
                {/* t-shirt mockup close up */}
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop" alt="T-Shirt Detail" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 mt-8">
                {/* tote bag mockup */}
                <img src="https://pixabay.com/get/g9ee23359969cabe385588d0e3334ed1641d5c6213445e66b0f016442d88c4cece09eab5648fe265d086fcc0a779b5b8094d11f4f98632d882e97421debd9c6be_1280.jpg" alt="Canvas Bag" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
