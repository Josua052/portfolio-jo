import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-2xl border border-border bg-background/60 backdrop-blur
        p-6 transition hover:border-foreground/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}