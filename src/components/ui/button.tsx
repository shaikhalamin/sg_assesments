import * as React from "react"
import { Slot } from "radix-ui"

import { composeEventHandlers, useAnimeHoverMotion } from "@/components/animation"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button-variants"

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  disabled,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const motionHandlers = useAnimeHoverMotion<HTMLButtonElement>({ disabled })

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      onPointerEnter={composeEventHandlers(onPointerEnter, motionHandlers.onPointerEnter)}
      onPointerLeave={composeEventHandlers(onPointerLeave, motionHandlers.onPointerLeave)}
      onFocus={composeEventHandlers(onFocus, motionHandlers.onFocus)}
      onBlur={composeEventHandlers(onBlur, motionHandlers.onBlur)}
      {...props}
    />
  )
}

export { Button }
