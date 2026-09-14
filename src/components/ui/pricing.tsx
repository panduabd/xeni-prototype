import * as React from "react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { PricingColumn, type PricingColumnProps } from "@/components/ui/pricing-utils/pricing-column";
import { Section } from "@/components/ui/pricing-utils/section";

export interface PricingProps {
  title?: React.ReactNode | string | false;
  description?: React.ReactNode | string | false;
  plans?: PricingColumnProps[] | false;
  monthlyPlans?: PricingColumnProps[];
  annualPlans?: PricingColumnProps[];
  className?: string;
  containerClassName?: string;
  plansClassName?: string;
  showBillingToggle?: boolean;
}

export const DEFAULT_MONTHLY_PLANS: PricingColumnProps[] = [
  {
    name: "Starter",
    description: "For growing businesses",
    price: "140K",
    originalPrice: "300K",
    discountBadge: "53% OFF",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed monthly, cancel anytime.",
    priceNote: "Billed monthly. Cancel anytime.",
    annualSavingsNote: "Save Rp 240K with annual billing",
    credits: {
      amount: "1,500",
      dailyRefill: "+100 Daily credit refill",
      filledTicks: 3,
      totalTicks: 24,
    },
    cta: {
      variant: "outline",
      label: "Get Starter Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">450</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">5</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">3</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">2</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "default",
  },
  {
    name: "Basic",
    description: "For serious marketing",
    price: "280K",
    originalPrice: "550K",
    discountBadge: "49% OFF",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed monthly, cancel anytime.",
    priceNote: "Billed monthly. Cancel anytime.",
    annualSavingsNote: "Save Rp 480K with annual billing",
    credits: {
      amount: "4,000",
      dailyRefill: "+200 Daily credit refill",
      filledTicks: 6,
      totalTicks: 24,
    },
    cta: {
      variant: "outline",
      label: "Get Basic Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">1,000</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">10</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">20</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">4</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "default",
  },
  {
    name: "Pro",
    badge: "Most popular",
    discountBadge: "55% OFF",
    description: "Automate multiple brands",
    price: "680K",
    originalPrice: "1.500K",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed monthly, cancel anytime.",
    priceNote: "Billed monthly. Cancel anytime.",
    annualSavingsNote: "Save Rp 1.680K with annual billing",
    credits: {
      amount: "14,500",
      dailyRefill: "+250 Daily credit refill",
      filledTicks: 14,
      totalTicks: 24,
    },
    cta: {
      variant: "default",
      label: "Get Pro Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">2,200</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">30</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">50</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">6</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "glow-brand",
  },
  {
    name: "Agency",
    description: "High-volume marketing automation",
    price: "1.680K",
    originalPrice: "2.800K",
    discountBadge: "40% OFF",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed monthly, cancel anytime.",
    priceNote: "Billed monthly. Cancel anytime.",
    annualSavingsNote: "Save Rp 3.360K with annual billing",
    credits: {
      amount: "25,000",
      dailyRefill: "+1,000 Daily credit refill",
      filledTicks: 24,
      totalTicks: 24,
    },
    cta: {
      variant: "default",
      label: "Get Agency Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">5,500</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">100</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">Unlimited</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">10</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "glow",
  },
];

export const DEFAULT_ANNUAL_PLANS: PricingColumnProps[] = [
  {
    name: "Starter",
    description: "For growing businesses",
    price: "120K",
    originalPrice: "300K",
    discountBadge: "60% OFF",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed annually, cancel anytime.",
    priceNote: "Save Rp 240K compared to monthly",
    credits: {
      amount: "1,500",
      dailyRefill: "+100 Daily credit refill",
      filledTicks: 3,
      totalTicks: 24,
    },
    cta: {
      variant: "outline",
      label: "Get Starter Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">450</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">5</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">3</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">2</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "default",
  },
  {
    name: "Basic",
    description: "For serious marketing",
    price: "240K",
    originalPrice: "550K",
    discountBadge: "56% OFF",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed annually, cancel anytime.",
    priceNote: "Save Rp 480K compared to monthly",
    credits: {
      amount: "4,000",
      dailyRefill: "+200 Daily credit refill",
      filledTicks: 6,
      totalTicks: 24,
    },
    cta: {
      variant: "outline",
      label: "Get Basic Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">1,000</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">10</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">20</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">4</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "default",
  },
  {
    name: "Pro",
    badge: "Most popular",
    discountBadge: "64% OFF",
    description: "Automate multiple brands",
    price: "540K",
    originalPrice: "1.500K",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed annually, cancel anytime.",
    priceNote: "Save Rp 1.680K compared to monthly",
    credits: {
      amount: "14,500",
      dailyRefill: "+250 Daily credit refill",
      filledTicks: 14,
      totalTicks: 24,
    },
    cta: {
      variant: "default",
      label: "Get Pro Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">2,200</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">30</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">50</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">6</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "glow-brand",
  },
  {
    name: "Agency",
    description: "High-volume marketing automation",
    price: "1.400K",
    originalPrice: "2.800K",
    discountBadge: "50% OFF",
    currency: "Rp",
    period: "/month",
    billingSubtext: "Billed annually, cancel anytime.",
    priceNote: "Save Rp 3.360K compared to monthly",
    credits: {
      amount: "25,000",
      dailyRefill: "+1,000 Daily credit refill",
      filledTicks: 24,
      totalTicks: 24,
    },
    cta: {
      variant: "default",
      label: "Get Agency Now",
      href: "/login",
    },
    features: [
      { type: "item", label: <>Up to <strong className="font-semibold text-foreground">5,500</strong> AI design/mo</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">100</strong> Business DNA</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">Unlimited</strong> Social Channels</> },
      { type: "item", label: <><strong className="font-semibold text-foreground">10</strong> Concurrent Tasks</> },
      { type: "item", label: "Commercial License" },
      { type: "divider" },
      { type: "header", label: "Marketing Automation" },
      { type: "item", label: "Content Automation" },
      { type: "item", label: "Content Scheduler" },
      { type: "item", label: "Auto Reply" },
      { type: "item", label: "Auto DM" },
    ],
    variant: "glow",
  },
];

export default function Pricing({
  title = (
    <>
      Choose the Plan
      <br />
      That Fits Your Marketing
    </>
  ),
  description = false,
  plans,
  monthlyPlans = DEFAULT_MONTHLY_PLANS,
  annualPlans = DEFAULT_ANNUAL_PLANS,
  showBillingToggle = true,
  className = "",
  containerClassName = "",
  plansClassName = "",
}: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  React.useEffect(() => {
    (window as any).__setBillingCycle = (cycle: "monthly" | "annual") => {
      setBillingCycle(cycle);
    };
    return () => {
      delete (window as any).__setBillingCycle;
    };
  }, []);

  const currentPlans = plans
    ? plans
    : billingCycle === "annual"
    ? annualPlans
    : monthlyPlans;

  return (
    <Section
      className={cn("font-poppins pt-16 sm:pt-24 md:pt-28", className)}
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className={cn("mx-auto flex max-w-7xl flex-col items-center w-full", containerClassName || "gap-16 sm:gap-20")}>
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-6">
            {title && (
              <h2 className="text-3xl leading-tight font-medium sm:text-5xl sm:leading-tight text-foreground font-poppins">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {showBillingToggle && (
          <div className="flex justify-center relative z-50 pointer-events-auto">
            <div className="inline-flex h-10 items-center justify-center rounded-xl bg-muted/60 p-1 text-muted-foreground border border-border/50 shadow-xs relative z-50 pointer-events-auto">
              <button
                type="button"
                id="pricing-toggle-monthly"
                data-toggle="monthly"
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-5 py-1.5 text-sm font-medium transition-all cursor-pointer select-none font-poppins relative z-50 pointer-events-auto",
                  billingCycle === "monthly"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                id="pricing-toggle-annual"
                data-toggle="annual"
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-lg px-5 py-1.5 text-sm font-medium transition-all cursor-pointer select-none font-poppins relative z-50 pointer-events-auto",
                  billingCycle === "annual"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>Annual</span>
                <span className="text-[11px] font-medium text-white bg-red-600 px-2 py-0.5 rounded-full shadow-xs pointer-events-none">
                  Up to 64% OFF
                </span>
              </button>
            </div>
          </div>
        )}

        {currentPlans !== false && currentPlans.length > 0 && (
          <div className={cn("w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", plansClassName)}>
            {currentPlans.map((plan) => (
              <PricingColumn
                key={`${billingCycle}-${plan.name}`}
                name={plan.name}
                badge={plan.badge}
                discountBadge={plan.discountBadge}
                description={plan.description}
                price={plan.price}
                currency={plan.currency}
                originalPrice={plan.originalPrice}
                promotionText={plan.promotionText}
                priceNote={plan.priceNote}
                annualSavingsNote={plan.annualSavingsNote}
                onSwitchToAnnual={() => setBillingCycle("annual")}
                isAnnual={billingCycle === "annual"}
                period={plan.period}
                billingText={plan.billingText}
                billingSubtext={plan.billingSubtext}
                credits={plan.credits}
                cta={plan.cta}
                features={plan.features}
                variant={plan.variant}
                className={plan.className}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
