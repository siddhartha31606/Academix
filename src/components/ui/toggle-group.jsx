import * as React from "react";
import * as reactToggleGroup from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef( & VariantProps
>(({ className, variant, size, children, ...props }, ref) => (
  
    {children}
  
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef( & VariantProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    
      {children}
    
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
