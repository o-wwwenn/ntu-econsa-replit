import { useFundraisingStatus, useFundraisingGoals } from "@/hooks/use-resources";
import { PageTransition } from "@/components/PageTransition";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, Globe, Skull } from "lucide-react";
import { motion } from "framer-motion";

function GoalsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="h-12 w-48 bg-muted rounded mx-auto" />
      <div className="h-64 bg-muted rounded-2xl" />
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-muted rounded-2xl" />)}
      </div>
    </div>
  );
}

export default function Goals() {
  const { data: status, isLoading: isStatusLoading } = useFundraisingStatus();
  const { data: goals, isLoading: isGoalsLoading } = useFundraisingGoals();

  if (isStatusLoading || isGoalsLoading) return <GoalsLoading />;

  // Default icons for specific goals
  const getIcon = (index: number) => {
    switch(index) {
      case 0: return Lightbulb;
      case 1: return Target;
      case 2: return Globe;
      default: return Target;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">募款目標與進度</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            透明公開的募款流向，確保每一分資源都用在刀口上。
          </p>
        </div>

        {/* Progress Section */}
        {status && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 mb-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">目前募款進度</h2>
                <p className="text-muted-foreground">目標金額: NT$ {status.targetAmount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-serif font-bold text-primary">{status.percentage}%</span>
                <span className="text-muted-foreground ml-2">已達成</span>
              </div>
            </div>
            
            <Progress value={status.percentage} className="h-4 bg-muted mb-4" indicatorClassName="bg-gradient-to-r from-primary to-accent transition-all duration-1000" />
            
            <p className="text-right text-sm font-medium text-primary">
              目前金額: NT$ {status.currentAmount.toLocaleString()}
            </p>
          </motion.div>
        )}

        {/* Goals Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {goals?.map((goal, index) => {
            const Icon = getIcon(index);
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold text-accent-foreground mb-1 text-sm uppercase tracking-wide">募款目的</h4>
                      <p className="text-muted-foreground leading-relaxed">{goal.purpose}</p>
                    </div>
                    <div className="pt-4 border-t border-dashed">
                      <h4 className="font-semibold text-primary mb-1 text-sm uppercase tracking-wide">預期成效</h4>
                      <p className="text-muted-foreground leading-relaxed">{goal.expectedOutcome}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
