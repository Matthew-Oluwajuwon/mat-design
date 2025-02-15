import { type VariantProps } from 'class-variance-authority';
import { Refresh } from 'iconoir-react';
import React, { ReactNode } from 'react';
import { buttonVariants } from './Button.variant';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    loading?: boolean;
  };

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  rounded = 'large',
  className,
  children,
  endIcon,
  startIcon,
  loading,
  disabled,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ rounded, variant, size, className })}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Refresh className="animate-spin" /> : startIcon}
      {children}
      {endIcon}
    </button>
  );
};
