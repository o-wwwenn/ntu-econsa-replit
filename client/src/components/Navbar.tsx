import { Link, useLocation } from "wouter";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "首頁" },
  { href: "/goals", label: "募款計畫" },
  { href: "/sponsorship", label: "贊助方案" },
  { href: "/events", label: "活動回顧" },
  { href: "/how-to", label: "如何贊助" },
  { href: "/about", label: "關於我們" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-accent" />
            <span className="hidden sm:inline">NTU ECON SA</span>
            <span className="sm:hidden">ECON SA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  location === link.href 
                    ? "bg-primary/10 text-primary font-bold shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/how-to" 
              className="ml-4 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
            >
              立即贊助
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-md text-base font-medium transition-colors",
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t my-2" />
              <Link
                href="/how-to"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-3 rounded-md bg-primary text-primary-foreground font-bold shadow-md active:scale-95 transition-transform"
              >
                立即贊助
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
