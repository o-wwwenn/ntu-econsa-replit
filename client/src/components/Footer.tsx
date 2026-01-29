import { GraduationCap, Facebook, Instagram, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-serif text-2xl font-bold">
              <GraduationCap className="h-8 w-8 text-accent" />
              <span>NTU ECON SA</span>
            </div>
            <p className="text-primary-foreground/80 max-w-sm">
              國立臺灣大學經濟學系系學會<br />
              致力於學術交流與學生福祉，連結系友與在校生，共創美好未來。
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-accent">聯絡我們</h3>
            <div className="flex items-start gap-2 text-primary-foreground/80">
              <MapPin className="h-5 w-5 mt-1 shrink-0" />
              <span>
                10617 臺北市大安區羅斯福路四段1號<br />
                社會科學院 經濟學系系學會
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-accent">關注我們</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} NTU Department of Economics Student Association. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
