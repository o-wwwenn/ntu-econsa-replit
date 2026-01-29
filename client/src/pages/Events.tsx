import { useEvents } from "@/hooks/use-resources";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />)}
    </div>
  );
}

export default function Events() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) return <EventsLoading />;

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">活動精彩回顧</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            系學會致力於舉辦多元活動，豐富學生的校園生活。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          {events?.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`group ${index % 3 === 0 ? 'lg:col-span-2 lg:row-span-2' : 'lg:col-span-1 lg:row-span-1'}`}
            >
              <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
                <div className="relative h-full min-h-[200px] flex flex-col">
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                  
                  {/* Content Overlay */}
                  <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white mt-auto">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2 font-medium">
                      <CalendarDays className="w-4 h-4 text-accent" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className={`font-serif font-bold mb-2 group-hover:text-accent transition-colors ${index % 3 === 0 ? 'text-2xl' : 'text-xl'}`}>
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
