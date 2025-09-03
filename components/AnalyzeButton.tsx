"use client";
import { Button } from "@/components/ui/button";

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function AnalyzeButton({ onClick, disabled, children = "분석하기", className }: Props) {
  return (
    <Button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </Button>
  );
}


