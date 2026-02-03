import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
  description?: string;
  eyebrow?: string;
};

export function Section({
  className,
  children,
  title,
  description,
  eyebrow,
  ...props
}: SectionProps) {
  return (
    <section className={cn("w-full py-16 md:py-20", className)} {...props}>
      <div className="container space-y-8">
        {title ? (
          <div className="max-w-3xl space-y-3">
            {eyebrow ? (
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-3xl uppercase text-foreground md:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="text-base text-muted-foreground md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
