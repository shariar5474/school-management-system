/**
 * Loading Spinner component
 */
import React from 'react';
import { cn } from '@/lib/utils';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
};

export default function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={cn(
          'animate-spin rounded-full border-primary-200 border-t-primary',
          sizeStyles[size],
          className
        )}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );
}


export { Spinner };
