import { cn } from '@mat-design/utilities';
import { Refresh } from 'iconoir-react';
import { ElementType, forwardRef, memo } from 'react';
import { ButtonProps } from './button.types';
import { buttonVariants } from './button.variant';

export const Button = memo(
  forwardRef(<T extends ElementType = 'button'>(
    {
      as,
      variant = 'primary',
      size = 'medium',
      rounded = 'medium',
      className,
      children,
      endIcon,
      startIcon,
      loading = false,
      disabled,
      ...props
    }: ButtonProps<T>,
    ref: React.Ref<T extends 'button' ? HTMLButtonElement : HTMLAnchorElement>
  ) => {
    const Component = as || 'button';
    const computedClassName = cn(buttonVariants({ rounded, variant, size }), className);

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={computedClassName}
        disabled={Component === 'button' ? loading || disabled : undefined}
        {...props}
      >
        {loading ? <Refresh className="animate-spin" /> : startIcon}
        {children}
        {endIcon}
      </Component>
    );
  })
);

Button.displayName = 'Button';
