"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { submitContact } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { division: "general" },
  });

  function onSubmit(data: ContactFormData) {
    setServerError(null);
    startTransition(async () => {
      const result = await submitContact(data);
      if (result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Ready to start a project? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-semibold">Contact Details</h3>
              <p className="mt-3 text-primary-foreground/70">
                Reach out directly or fill in the form and we&apos;ll get back to you shortly.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                  <Mail className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-foreground/60 uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:info@rorichgroup.co.za"
                    className="mt-1 font-medium hover:text-accent transition-colors"
                  >
                    info@rorichgroup.co.za
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                  <MapPin className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-foreground/60 uppercase tracking-wider">
                    Address
                  </p>
                  {/* TODO: Replace with real address once confirmed by owner */}
                  <p className="mt-1 font-medium text-primary-foreground/50 italic">
                    Address coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl bg-white/5 px-8 py-12 text-center">
                <div className="mb-4 text-5xl">✓</div>
                <h3 className="font-heading text-2xl font-semibold">Message Sent!</h3>
                <p className="mt-3 text-primary-foreground/70">
                  Thanks for reaching out. We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {serverError && (
                  <div className="rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-200">
                    {serverError}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldGroup label="Name" required>
                    <Input
                      id="name"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent focus-visible:ring-accent/30"
                      {...register("name")}
                    />
                    {errors.name && (
                      <FieldError id="name-error">{errors.name.message}</FieldError>
                    )}
                  </FieldGroup>

                  <FieldGroup label="Email" required>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent focus-visible:ring-accent/30"
                      {...register("email")}
                    />
                    {errors.email && (
                      <FieldError id="email-error">{errors.email.message}</FieldError>
                    )}
                  </FieldGroup>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldGroup label="Phone">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 XX XXX XXXX"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent focus-visible:ring-accent/30"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <FieldError id="phone-error">{errors.phone.message}</FieldError>
                    )}
                  </FieldGroup>

                  <FieldGroup
                    label="Division of Interest"
                    fieldId="division"
                    required
                  >
                    <select
                      id="division"
                      aria-invalid={!!errors.division}
                      aria-describedby={errors.division ? "division-error" : undefined}
                      className={cn(
                        "h-8 w-full rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-sm text-primary-foreground outline-none transition-colors",
                        "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/30",
                        "disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                      {...register("division")}
                    >
                      <option value="general" className="bg-primary text-primary-foreground">
                        General Enquiry
                      </option>
                      <option
                        value="paper-printers"
                        className="bg-primary text-primary-foreground"
                      >
                        Rorich Paper Printers
                      </option>
                      <option value="web-dev" className="bg-primary text-primary-foreground">
                        Rorich Web Dev
                      </option>
                    </select>
                    {errors.division && (
                      <FieldError id="division-error">{errors.division.message}</FieldError>
                    )}
                  </FieldGroup>
                </div>

                <FieldGroup label="Message" required>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project…"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent focus-visible:ring-accent/30"
                    {...register("message")}
                  />
                  {errors.message && (
                    <FieldError id="message-error">{errors.message.message}</FieldError>
                  )}
                </FieldGroup>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-accent text-white hover:bg-accent/90 disabled:opacity-70"
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldGroup({
  label,
  fieldId,
  required,
  children,
}: {
  label: string;
  fieldId?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = fieldId ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-primary-foreground/80"
      >
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="text-xs text-red-300">
      {children}
    </p>
  );
}
