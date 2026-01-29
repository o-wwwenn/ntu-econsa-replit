import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, CreditCard, Truck, ExternalLink, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HowTo() {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "已複製",
      description: "匯款資訊已複製到剪貼簿",
    });
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">如何贊助</h1>
          <p className="text-lg text-muted-foreground">
            簡單四步驟，即可完成贊助並獲得限量回饋品。
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-primary/20 -z-10" />

          {[
            { step: "01", title: "選擇方案", desc: "瀏覽並決定您想要的贊助回饋方案。" },
            { step: "02", title: "進行匯款", desc: "使用 ATM 或 Line Pay 完成款項支付。" },
            { step: "03", title: "填寫表單", desc: "上傳匯款證明並填寫寄送資訊。" },
            { step: "04", title: "等待領取", desc: "系學會確認後將盡速為您寄出。" },
          ].map((item, index) => (
            <div key={index} className="text-center group bg-background p-4 rounded-xl">
              <div className="w-24 h-24 bg-card border-4 border-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-300 relative">
                 <div className="absolute inset-0 bg-primary/5 rounded-full" />
                 <span className="text-3xl font-serif font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Bank Transfer Info */}
          <Card className="p-8 border-primary/10 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6" /> 銀行匯款
            </h3>
            <div className="space-y-6 bg-muted/50 p-6 rounded-xl">
              <div>
                <span className="text-sm text-muted-foreground block mb-1">銀行代碼</span>
                <p className="font-mono text-xl font-bold">000 (XXX銀行)</p>
              </div>
              <div className="relative">
                <span className="text-sm text-muted-foreground block mb-1">匯款帳號</span>
                <div className="flex items-center justify-between">
                   <p className="font-mono text-2xl font-bold tracking-wider text-primary">1234-5678-9012</p>
                   <Button variant="ghost" size="icon" onClick={() => handleCopy("1234-5678-9012")}>
                     <Copy className="w-4 h-4" />
                   </Button>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">戶名</span>
                <p className="font-medium text-lg">國立臺灣大學經濟學系系學會</p>
              </div>
            </div>
          </Card>

          {/* Line Pay & Action */}
          <div className="flex flex-col gap-8">
            <Card className="p-8 border-[#00C300]/20 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C300]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="text-2xl font-serif font-bold text-[#00C300] mb-6 flex items-center gap-2">
                Line Pay 支付
              </h3>
              <div className="flex flex-col items-center justify-center space-y-4">
                 <div className="w-48 h-48 bg-white p-2 rounded-lg border shadow-sm">
                   {/* QR Code Placeholder */}
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ExampleLinePayLink" alt="Line Pay QR" className="w-full h-full" />
                 </div>
                 <p className="text-sm text-muted-foreground">掃描 QR Code 快速付款</p>
              </div>
            </Card>

            <Button size="lg" className="w-full h-16 text-xl rounded-xl shadow-xl shadow-primary/20 animate-pulse bg-primary hover:bg-primary/90">
              <CheckCircle2 className="mr-2 h-6 w-6" />
              已匯款，前往填寫表單
            </Button>
          </div>
        </div>

        {/* Logistics */}
        <div className="bg-card border border-border rounded-2xl p-8 flex items-start gap-6 shadow-sm">
          <div className="bg-muted p-4 rounded-full hidden sm:block">
            <Truck className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">物流與運費說明</h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li>全台本島運費一律 80 元，滿 2000 元免運費。</li>
              <li>提供「系館自取」服務，請於填表時選擇自取時間。</li>
              <li>預計出貨時間：2026 年 5 月中旬陸續發貨。</li>
              <li>海外贊助者請先私訊粉專確認運費事宜。</li>
            </ul>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
