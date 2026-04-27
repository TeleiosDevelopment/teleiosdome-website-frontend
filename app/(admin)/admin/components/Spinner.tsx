'use client';

interface SpinnerProps {
  colorClass?: string;
}

export default function Spinner({ colorClass = 'border-purple-600' }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-6 h-6 border-4 ${colorClass} border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}