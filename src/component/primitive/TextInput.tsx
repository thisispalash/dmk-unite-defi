'use client';

import cn from '@/util/cn';

interface TextInputProps {
  label: string;
  value: string;
  type?: 'text' | 'email' | 'number';
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
}


export default function TextInput({
  label,
  value,
  type = 'text',
  onChange,
  placeholder,
  className,
  isDisabled = false,
}: TextInputProps) {

  return (
    <div className={cn(
      'w-full',
      className
    )}>

      {label && (
        <label className={cn(
          'w-full'
        )}>
          {label}
        </label>
      )}

      <input
        className={cn(
          'w-full p-2 rounded-md',
          'border border-foreground focus:bg-background md:focus:bg-transparent',
          'focus:outline-none focus:ring-none focus:ring-foreground',
          'transition-all duration-300 ease-in-out',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
      />

    </div>
  );
}