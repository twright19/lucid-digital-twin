import React, { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = forwardRef<HTMLSpanElement, React.ComponentProps<typeof SliderPrimitive.Root>>(
  (props, ref) => (
    <SliderPrimitive.Root ref={ref} className="relative flex w-full touch-none select-none items-center" {...props} />
  )
);

Slider.displayName = "Slider";

export default Slider;
