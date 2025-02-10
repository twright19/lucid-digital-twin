"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = React.forwardRef((props, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className="relative flex w-full touch-none select-none items-center"
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white" />
  </SliderPrimitive.Root>
))

Slider.displayName = "Slider"

export { Slider }