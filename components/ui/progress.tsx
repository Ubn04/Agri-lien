interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  variant = 'default',
  size = 'md',
  indeterminate = false
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    default: 'bg-agri-green-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progression</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        {indeterminate ? (
          <div className={`h-full ${variants[variant]} progress-indeterminate`}></div>
        ) : (
          <div
            className={`h-full ${variants[variant]} transition-all duration-300 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        )}
      </div>
    </div>
  );
}
