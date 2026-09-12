import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border/80 shadow-xs",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive shadow-xs dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-amber-500/30 bg-amber-50 text-amber-900 shadow-xs dark:bg-amber-950/20 dark:text-amber-200 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        success:
          "border-emerald-500/30 bg-emerald-50 text-emerald-900 shadow-xs dark:bg-emerald-950/20 dark:text-emerald-200 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
        info:
          "border-blue-500/30 bg-blue-50 text-blue-900 shadow-xs dark:bg-blue-950/20 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("col-start-2 font-semibold text-[13px] leading-tight tracking-tight text-foreground", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("col-start-2 text-xs text-muted-foreground [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }
