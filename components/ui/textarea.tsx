"use client";
import * as React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${props.className ?? ""}`}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";







