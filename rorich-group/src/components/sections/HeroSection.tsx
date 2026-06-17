import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Printer, Code2 } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center bg-primary text-primary-foreground pt-20 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          The Rorich Group
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/70 mb-10 max-w-xl mx-auto">
          Print. Brand. Build.
        </p>
        <a
          href="#contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-3 text-base"
          )}
        >
          Get in Touch
        </a>
      </div>

      <div className="mt-20 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <a
          href="#services-print"
          className="group bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 transition-colors cursor-pointer"
        >
          <Printer className="text-accent mb-4 h-10 w-10" />
          <h2 className="font-heading text-xl font-semibold mb-2">
            Rorich Paper Printers
          </h2>
          <p className="text-primary-foreground/60 text-sm mb-4">
            Business cards, stickers, large-format printing, clothing supply,
            and branded clothing.
          </p>
          <span className="text-accent text-sm font-medium group-hover:underline">
            Explore →
          </span>
        </a>

        <a
          href="#services-web"
          className="group bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 transition-colors cursor-pointer"
        >
          <Code2 className="text-accent mb-4 h-10 w-10" />
          <h2 className="font-heading text-xl font-semibold mb-2">
            Rorich Web Dev
          </h2>
          <p className="text-primary-foreground/60 text-sm mb-4">
            Custom web-hosted applications and website design & build for
            clients.
          </p>
          <span className="text-accent text-sm font-medium group-hover:underline">
            Explore →
          </span>
        </a>
      </div>
    </section>
  );
}
