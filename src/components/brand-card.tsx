import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrandCardProps extends React.HTMLAttributes<HTMLDivElement> {
  subtleHover?: boolean;
}

const BrandCard = React.forwardRef<HTMLDivElement, BrandCardProps>(
  ({ className, children, subtleHover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[16px] border border-border/80 bg-card/90 p-6 shadow-card transition-all duration-200 sm:p-8",
          subtleHover
            ? "hover:border-gold/40"
            : "hover:-translate-y-1 hover:shadow-soft",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BrandCard.displayName = "BrandCard";

export { BrandCard };
