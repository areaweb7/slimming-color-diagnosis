import * as React from "react"
import { cn } from "@/lib/utils"

// Define Button Props manually without CVA
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "brand"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {

        // Manual class mapping instead of CVA
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-transform duration-100"

        const variants = {
            default: "bg-brand-black text-white hover:bg-gray-800 shadow-md",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            brand: "bg-brand-yellow text-black hover:bg-brand-deepYellow shadow-md font-bold",
        }

        const sizes = {
            default: "h-12 px-6 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-14 rounded-md px-8",
            icon: "h-10 w-10",
        }

        const Comp = "button" // Simplified to always use button
        return (
            <Comp
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
