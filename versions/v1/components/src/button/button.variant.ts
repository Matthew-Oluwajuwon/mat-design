import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all gap-spacing-2 focus:ring-spacing-system-spacing-xxs ring-primary-200 disabled:pointer-event-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-800 focus:bg-primary-500 disabled:bg-gray-200 disabled:text-color-grey-grey-400 disabled:cursor-not-allowed",
        secondary:
          "border border-primary-500 text-color-text-accent hover:bg-primary-50 active:bg-primary-100 disabled:text-gray-200 disabled:border-gray-200 disabled:bg-transparent",
        ghost:
          "bg-transparent text-color-text-accent hover:bg-primary-50 active:bg-primary-100 disabled:text-gray-200 disabled:bg-transparent",
      },
      size: {
        tiny: "px-spacing-2 py-spacing-1 text-button-font-tiny-fontsize",
        small: "px-spacing-3 py-spacing-2 text-button-font-small-fontsize",
        medium: "px-spacing-4 py-spacing-3 text-button-font-medium-fontsize",
        large: "px-spacing-5 py-spacing-3 text-button-font-large-fontsize",
        giant: "px-spacing-6 py-spacing-4 text-button-font-giant-fontsize",
      },
      rounded: {
        tiny: "rounded-spacing-system-radius-xxs",
        small: "rounded-spacing-system-radius-xs",
        medium: "rounded-spacing-system-radius-xs",
        large: "rounded-spacing-system-radius-sm",
        giant: "rounded-spacing-system-radius-sm",
      },
    },
    compoundVariants: [
      {
        variant: "secondary",
        size: "giant",
        className: "",
      },
      {
        variant: "primary",
        rounded: "tiny",
        className: "",
      },
      {
        variant: "ghost",
        size: "tiny",
        className: "",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "giant",
      rounded: "giant",
    },
  }
);
