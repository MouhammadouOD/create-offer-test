import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export interface InputWithLabelProps
  extends InputProps {
    label: string;
  }
const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
    ({ className, type, id, ...props }, ref) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} placeholder="Email" />
    </div>
  );
}
