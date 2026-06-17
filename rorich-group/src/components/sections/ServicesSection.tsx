import {
  CreditCard,
  Tag,
  Maximize2,
  Shirt,
  Star,
  AppWindow,
  Layout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const printServices: ServiceCard[] = [
  {
    icon: CreditCard,
    title: "Business Cards",
    description:
      "Premium business cards in a variety of finishes — matte, gloss, soft-touch, and more.",
  },
  {
    icon: Tag,
    title: "Stickers",
    description:
      "Custom-cut stickers and labels for products, packaging, promotions, and events.",
  },
  {
    icon: Maximize2,
    title: "Large-Format Printing",
    description:
      "Banners, posters, signage, and exhibition displays that command attention.",
  },
  {
    icon: Shirt,
    title: "Clothing Supply",
    description:
      "Bulk clothing sourcing and supply — T-shirts, golf shirts, workwear, and more.",
  },
  {
    icon: Star,
    title: "Branded Clothing",
    description:
      "Embroidery, screen printing, and heat transfer to put your brand on every item.",
  },
];

const webServices: ServiceCard[] = [
  {
    icon: AppWindow,
    title: "Custom Web Apps",
    description:
      "Bespoke web-hosted applications built to automate, streamline, or extend your business.",
  },
  {
    icon: Layout,
    title: "Website Design & Build",
    description:
      "Professionally designed, fast, responsive websites that convert visitors into clients.",
  },
];

function ServiceCardItem({ icon: Icon, title, description }: ServiceCard) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
      <Icon className="text-accent mb-4 h-8 w-8" />
      <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 px-6 bg-secondary scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-20 text-center">
          Our Services
        </h2>

        <div id="services-print" className="mb-20 scroll-mt-24">
          <div className="mb-10">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Rorich Paper Printers
            </h3>
            <p className="text-muted-foreground max-w-xl">
              High-quality print collateral and branded clothing to make your
              business look its best — from the first handshake to the boardroom.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {printServices.map((s) => (
              <ServiceCardItem key={s.title} {...s} />
            ))}
          </div>
        </div>

        <div id="services-web" className="scroll-mt-24">
          <div className="mb-10">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Rorich Web Dev
            </h3>
            <p className="text-muted-foreground max-w-xl">
              Modern, performant websites and web applications built to your
              exact requirements — no templates, no compromises.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
            {webServices.map((s) => (
              <ServiceCardItem key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
