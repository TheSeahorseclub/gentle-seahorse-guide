import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className,
  children
}) => {
  return (
    <header className={cn("px-6 pt-8 pb-4", className)}>
      <h1 className="font-display text-2xl font-bold text-foreground animate-fade-in">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-base leading-relaxed animate-fade-in">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
};
