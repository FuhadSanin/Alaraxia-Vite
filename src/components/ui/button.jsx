import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive rounded-full text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-gray-500 rounded-full text-white hover:bg-gray-400/80",
        blue: "bg-blue-500 text-white rounded-full ",
        green: "bg-green-500 text-white rounded-full ",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Status
        Pending: " border-2 border-yellow-500 text-yellow-500 rounded-full ",
        Closed: "border-2 border-green-500 text-green-500 rounded-full",
        Open: "border-2 rounded-full  border-cyan-500 text-cyan-500",
        Assigned: "border-2 rounded-full  border-blue-500 text-blue-500",
        Escalated: "border-2 rounded-full  border-red-500 text-red-500",
        Cancelled: "border-2 rounded-full  border-gray-500 text-gray-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
