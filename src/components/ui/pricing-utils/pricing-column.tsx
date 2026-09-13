import { cva, type VariantProps } from "class-variance-authority";
import { CircleHelp } from "lucide-react";
import type { ReactNode } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const pricingColumnVariants = cva(
  "relative flex flex-col gap-6 rounded-2xl p-6 lg:p-7 border border-gray-200/90 transition-all font-poppins shadow-none",
  {
    variants: {
      variant: {
        default: "bg-[#F8F9FB] border-gray-200/90",
        agency: "bg-[#F8F9FB] border-gray-200/90",
        glow: "bg-[#F8F9FB] border-gray-200/90",
        "glow-brand":
          "bg-white border-orange-500/40 hover:border-orange-500/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PricingCredits {
  amount: string;
  dailyRefill?: string;
  filledTicks: number;
  totalTicks?: number;
}

export type FeatureItem =
  | string
  | {
      type: "item";
      label: ReactNode;
    }
  | {
      type: "divider";
    }
  | {
      type: "header";
      label: string;
    };

export interface PricingColumnProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingColumnVariants> {
  name: string;
  icon?: ReactNode;
  badge?: string;
  discountBadge?: string;
  description: string;
  price: number | string;
  currency?: string;
  originalPrice?: number | string;
  promotionText?: ReactNode;
  priceNote: string;
  annualSavingsNote?: string;
  onSwitchToAnnual?: () => void;
  isAnnual?: boolean;
  period?: string;
  billingText?: string;
  billingSubtext?: string;
  credits?: PricingCredits;
  cta: {
    variant: "glow" | "default" | "outline" | "secondary";
    label: string;
    href: string;
  };
  features: (string | FeatureItem)[];
}

function renderAnnualSavingsNote(note: string) {
  const match = note.match(/^(Save\s+Rp\s*[\d\.\,\s]+[KMB]?)(.*)$/i);
  if (match) {
    return (
      <>
        <strong className="font-semibold text-foreground">{match[1]}</strong>
        <span>{match[2]}</span>
      </>
    );
  }
  return note;
}

export function PricingColumn({
  name,
  icon,
  badge,
  discountBadge,
  description,
  price,
  currency,
  originalPrice,
  promotionText,
  priceNote,
  annualSavingsNote,
  onSwitchToAnnual,
  isAnnual = false,
  period,
  billingText,
  billingSubtext,
  credits,
  cta,
  features,
  variant,
  className,
  ...props
}: PricingColumnProps) {
  return (
    <div
      data-plan={name}
      className={cn(pricingColumnVariants({ variant, className }))}
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
      {...props}
    >
      {(badge || discountBadge) && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20 flex-wrap justify-end">
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#111827] text-white text-[11px] font-semibold tracking-tight shadow-xs">
              {badge}
            </span>
          )}
          {discountBadge && (
            <span data-discount-badge className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10.5px] font-bold tracking-tight shadow-2xs">
              {discountBadge}
            </span>
          )}
        </div>
      )}
      {variant === "glow-brand" ? (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {/* Top bright orange gradient beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_1px_10px_rgba(249,115,22,0.8)]" />
          {/* Soft ambient orange radial glow strictly inside card */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-500/15 dark:bg-orange-500/25 blur-2xl rounded-full" />
        </div>
      ) : (
        <hr className="via-foreground/60 absolute top-0 left-[10%] h-[1px] w-[80%] border-0 bg-linear-to-r from-transparent to-transparent pointer-events-none" />
      )}
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-[26px] font-semibold text-foreground tracking-tight">
            {name}
          </h2>
          <p className="text-muted-foreground text-[11.5px] sm:text-[12px] leading-tight font-normal truncate" title={description}>
            {description}
          </p>
        </header>

        <section className="flex flex-col gap-0.5">
          <div
            data-original-price-wrap
            className="text-sm sm:text-base font-semibold text-muted-foreground/60 line-through tracking-tight mb-0.5"
            style={{ display: originalPrice ? undefined : "none" }}
          >
            {originalPrice ? `${currency} ${originalPrice}` : ""}
          </div>
          <div className="flex items-baseline flex-wrap gap-1">
            {currency && (
              <span className="text-base sm:text-lg font-normal text-foreground self-start pt-1">
                {currency}
              </span>
            )}
            <span
              data-price-amount
              className="text-4xl sm:text-[42px] font-normal tracking-tight text-foreground font-poppins leading-none"
            >
              {price}
            </span>
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {period || "/month"}
            </span>
          </div>
          <p data-billing-subtext className="text-[11.5px] sm:text-[12px] font-normal text-muted-foreground mt-1">
            {billingSubtext || "Billed monthly, cancel anytime."}
          </p>
          {promotionText && (
            <div className="text-emerald-600 dark:text-emerald-400 text-xs font-normal mt-0.5">
              {promotionText}
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3.5 pt-1">
          <a
            href={cta.href}
            className={cn(
              "w-full h-10 rounded-xl font-poppins font-medium text-[13px] inline-flex items-center justify-center transition-all cursor-pointer select-none relative overflow-hidden shrink-0",
              cta.variant === "outline" && "bg-white text-[#111827] border border-gray-300 hover:bg-gray-50 shadow-2xs hover:text-black",
              cta.variant === "default" && "bg-[#111827] text-white hover:bg-black shadow-xs",
            )}
          >
            <span className="relative z-10">{cta.label}</span>
            {name === "Pro" && (
              <span className="absolute inset-0 pointer-events-none animate-light-swipe bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full z-20" />
            )}
          </a>

          <div data-note-area className="flex items-center justify-center py-1">
            {!isAnnual && annualSavingsNote ? (
              <button
                type="button"
                data-action="switch-annual"
                onClick={onSwitchToAnnual}
                className="text-muted-foreground hover:text-foreground text-[12px] leading-snug font-normal inline-flex items-center justify-center gap-1 cursor-pointer transition-colors group/save select-none"
              >
                <span>{renderAnnualSavingsNote(annualSavingsNote)}</span>
                <span className="transition-transform group-hover/save:translate-x-0.5">→</span>
              </button>
            ) : (
              <p className="text-muted-foreground text-[12px] leading-snug font-normal text-center">
                {renderAnnualSavingsNote(priceNote)}
              </p>
            )}
          </div>
          <hr className="border-border/60 mt-1" />
        </div>
      </div>

      {credits && (
        <div className="flex flex-col gap-2 py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-foreground tracking-tight">
              {credits.amount} credits/mo
            </span>
            <div className="relative group/help inline-flex items-center">
              <CircleHelp className="size-3.5 text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white cursor-help transition-colors" />
              <div className="absolute bottom-full right-0 sm:left-1/2 sm:-translate-x-1/2 mb-2 hidden group-hover/help:block z-50 w-56 p-2.5 text-[11.5px] font-normal leading-snug text-white bg-[#111827] dark:bg-zinc-800 rounded-lg shadow-xl pointer-events-none">
                Credits are used for high-speed AI image generation and workflow automation.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[3px] w-full py-0.5">
            {Array.from({ length: credits.totalTicks || 24 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-3.5 flex-1 rounded-full transition-all duration-300",
                  i < credits.filledTicks
                    ? "bg-[#111827] dark:bg-white"
                    : "bg-[#E5E7EB] dark:bg-zinc-800"
                )}
              />
            ))}
          </div>

          {credits.dailyRefill && (
            <p className="text-[12px] text-muted-foreground font-normal">
              {credits.dailyRefill}
            </p>
          )}
        </div>
      )}

      <div>
        <ul className="flex flex-col gap-2.5">
          {features.map((feature, index) => {
            if (typeof feature === "object" && feature !== null && "type" in feature) {
              if (feature.type === "divider") {
                return (
                  <li key={`divider-${index}`} className="list-none py-1">
                    <hr className="border-border/60" />
                  </li>
                );
              }
              if (feature.type === "header") {
                return (
                  <li
                    key={`header-${index}`}
                    className="list-none text-[13px] font-medium text-foreground tracking-tight pt-1 pb-0.5"
                  >
                    {feature.label}
                  </li>
                );
              }
              return (
                <li
                  key={`item-${index}`}
                  className="flex items-center gap-2 text-[12.5px] text-foreground/90 font-normal leading-tight"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    className="size-4 shrink-0 fill-current text-[#111827] dark:text-zinc-200"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                  <span>{feature.label}</span>
                </li>
              );
            }
            return (
              <li
                key={`${feature}-${index}`}
                className="flex items-center gap-2 text-[12.5px] text-foreground/90 font-normal leading-tight"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="size-4 shrink-0 fill-current text-[#111827] dark:text-zinc-200"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                </svg>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { pricingColumnVariants };
