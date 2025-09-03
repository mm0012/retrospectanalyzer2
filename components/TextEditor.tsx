"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
};

export default function TextEditor({ value = "", onChange, placeholder = "주간 회고를 입력하세요", className, disabled, style }: Props) {
  const [text, setText] = useState<string>(value);
  return (
    <Textarea
      className={className || "h-64"}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange?.(e.target.value);
      }}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
    />
  );
}


