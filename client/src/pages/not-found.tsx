import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <AlertCircle className="h-24 w-24 text-destructive mb-6 opacity-20" />
      <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        抱歉，您尋找的頁面似乎不存在或已被移除。
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">回首頁</Button>
      </Link>
    </PageTransition>
  );
}
