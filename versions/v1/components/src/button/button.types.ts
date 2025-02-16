import { VariantProps } from "class-variance-authority";
import { ElementType, ReactNode } from "react";
import { buttonVariants } from "./button.variant";

export type AsProp<T extends ElementType> = {
  as?: T;
} & React.PropsWithoutRef<React.ComponentProps<T>>;

export type ButtonProps<T extends ElementType = 'button'> = AsProp<T> &
  VariantProps<typeof buttonVariants> & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    loading?: boolean;
    className?: string;
  };