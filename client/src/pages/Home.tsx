import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#002a52] text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
              經世濟民，<br className="md:hidden" />由你我開始
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
              凝聚系友力量，傳承學術薪火。
              <br />
              一同支持台大經濟系學會 2026 年度發展計畫。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/how-to">
                <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-6 rounded-full font-bold shadow-lg shadow-accent/20">
                  立即贊助 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/goals">
                <Button variant="outline" size="lg" className="border-white/30 text-primary hover:bg-white/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm">
                  了解計畫詳情
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background rounded-t-[50%] scale-x-150 translate-y-8"></div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              2026 年度展望
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              在這變動的時代，經濟學的智慧更顯珍貴。我們期許透過本次募款，優化系館空間、舉辦國際級學術論壇，並提供更多元的職涯探索機會。您的每一分支持，都將轉化為學弟妹成長的養分。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "學術深耕", desc: "舉辦大師講座與學術研討會，提升研究風氣。" },
              { icon: Users, title: "社群連結", desc: "強化系友網絡，建立跨世代的經驗傳承平台。" },
              { icon: BookOpen, title: "教育優化", desc: "更新系館軟硬體設備，打造優質學習環境。" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg shadow-primary/5 text-center"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
