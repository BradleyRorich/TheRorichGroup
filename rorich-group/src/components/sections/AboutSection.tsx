const teamMembers = [
  { name: "Bradley Rorich", role: "Founder & Director" },
  { name: "Team Member", role: "Print Specialist" },
  { name: "Team Member", role: "Web Developer" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-background scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-16 text-center">
          About The Rorich Group
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-foreground">
              Our Story
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              The Rorich Group was founded with a simple vision: to give South
              African businesses everything they need to look and operate
              professionally under one roof. Whether you need striking printed
              materials that make a lasting first impression, or a powerful web
              presence that works around the clock, we have the expertise to
              deliver.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Headquartered in South Africa, we take pride in building
              long-term relationships with our clients — understanding their
              brand, their goals, and their customers so that every project we
              produce is exactly right.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                Rorich Paper Printers
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                From crisp business cards to full-scale branded clothing, our
                print division delivers high-quality materials that make your
                brand unforgettable. We work closely with businesses of all
                sizes to produce print collateral that is both beautiful and
                effective.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                Rorich Web Dev
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our web division designs and builds custom websites and
                web-hosted applications tailored to your business. We combine
                modern technology with thoughtful design to create digital
                experiences your customers will love.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-2xl font-semibold mb-8 text-center text-foreground">
            Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name + member.role}
                className="bg-card rounded-2xl p-6 text-center border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4" />
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
