import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, variant = 'default', padding = 'md', className = '', ...props }: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    bordered: 'bg-white border-2 border-agri-green-200',
    elevated: 'bg-white shadow-xl border border-gray-100',
    flat: 'bg-gray-50'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={`rounded-xl transition-all hover:shadow-md ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export function CardImage({ src, alt, aspectRatio = '16/9' }: CardImageProps) {
  return (
    <div className={`w-full overflow-hidden rounded-t-xl aspect-${aspectRatio}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
}
