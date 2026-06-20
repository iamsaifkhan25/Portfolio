import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 md:p-8 ${
        hoverEffect ? "glass-panel-hover" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
