import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ variant = 'outline', className = '', children, ...props }: ButtonProps) {
  const baseStyles = "px-10 py-4 font-sans uppercase tracking-widest text-sm transition-colors duration-300";
  const variants = {
    outline: "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darker",
    primary: "bg-brand-gold border border-brand-gold text-brand-darker hover:bg-transparent text-brand-darker hover:text-brand-gold"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
