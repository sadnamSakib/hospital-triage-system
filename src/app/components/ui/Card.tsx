import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-10 ${className}`}>
      {title && <h2 className="text-3xl font-semibold mb-6">{title}</h2>}
      {children}
    </div>
  );
}
