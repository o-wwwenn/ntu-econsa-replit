import { useFaqs } from "@/hooks/use-resources";
import { PageTransition } from "@/components/PageTransition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap } from "lucide-react";

export default function About() {
  const { data: faqs, isLoading } = useFaqs();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">關於我們</h1>
        </div>

        {/* Vision Section */}
        <div className="prose prose-lg mx-auto mb-20 text-muted-foreground leading-relaxed">
          <p className="mb-6">
            國立臺灣大學經濟學系系學會（NTU Department of Economics Student Association）是系上學生自治組織的核心。
            我們不僅致力於維護學生權益，更扮演著連結系友、教授與在校生的橋樑角色。
          </p>
          <p>
            透過舉辦學術講座、企業參訪、體育競賽與藝文活動，我們期許為經濟系同學打造一個充滿活力、
            學術氛圍濃厚且具備歸屬感的大家庭。本次募款計畫，正是為了讓這份傳承能走得更遠、更穩。
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">常見問題 (FAQ)</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((faq, index) => (
                <AccordionItem key={faq.id} value={`item-${index}`} className="border-b-border/50">
                  <AccordionTrigger className="text-lg font-medium text-left hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pl-4 border-l-2 border-accent ml-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
