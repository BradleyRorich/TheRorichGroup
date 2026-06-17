"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const desktopLinkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-accent ${
      activeSection === href.slice(1)
        ? "text-accent border-b-2 border-accent pb-0.5"
        : "text-primary-foreground"
    }`;

  const mobileLinkClass = (href: string) =>
    `text-lg font-medium transition-colors hover:text-accent ${
      activeSection === href.slice(1) ? "text-accent" : "text-primary-foreground"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo wordmark */}
        <a
          href="#home"
          className="font-heading text-xl font-bold text-primary-foreground tracking-wide"
        >
          The Rorich Group
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={desktopLinkClass(link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile drawer */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-foreground transition-colors hover:bg-white/10"
              aria-label="Open menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-primary border-white/10">
              <nav className="flex flex-col gap-6 mt-8 px-4">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <a
                        href={link.href}
                        className={mobileLinkClass(link.href)}
                        onClick={() => setMobileOpen(false)}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
