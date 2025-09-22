"use client";
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = variant === "outline" ? "border bg-white hover:bg-gray-50" : "bg-black text-white hover:bg-gray-900";
    const sizes = size === "sm" ? "h-8 px-3 text-sm" : size === "lg" ? "h-11 px-6 text-base" : "h-10 px-4 text-sm";
    return (
      <button ref={ref} className={`${base} ${variants} ${sizes} ${className}`} {...props} />
    );
  }
);
Button.displayName = "Button";











