import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
