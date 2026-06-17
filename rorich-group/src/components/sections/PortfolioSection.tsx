"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { portfolioItems } from "@/lib/portfolio-data";
import type { PortfolioItem } from "@/lib/portfolio-data";

type Filter = "all" | "print" | "web";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Paper & Print", value: "print" },
  { label: "Web Dev", value: "web" },
];

function divisionLabel(division: PortfolioItem["division"]) {
  return division === "print" ? "Paper & Print" : "Web Dev";
}

export function PortfolioSection() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.division === active);

  return (
    <section
      id="portfolio"
      className="py-24 px-6 bg-background scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-10 text-center">
          Our Work
        </h2>

        <div className="flex justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                active === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="font-semibold text-foreground text-sm">
                  {item.title}
                </p>
                <Badge
                  variant={item.division === "print" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {divisionLabel(item.division)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
