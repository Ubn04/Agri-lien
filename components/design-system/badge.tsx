import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export function Badge({ children, variant = 'primary', size = 'md', dot = false, className = '', ...props }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    primary: 'bg-agri-green-100 text-agri-green-700 border-agri-green-200',
    secondary: 'bg-agri-ochre-100 text-agri-ochre-700 border-agri-ochre-200'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    primary: 'bg-agri-green-500',
    secondary: 'bg-agri-ochre-500'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
