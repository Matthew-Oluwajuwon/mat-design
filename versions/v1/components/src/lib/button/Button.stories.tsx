import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, ArrowRight, ArrowUp } from 'iconoir-react'; // Example Iconoir icon
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['giant', 'large', 'medium', 'small', 'tiny'],
    },
    rounded: {
      control: 'radio',
      options: ['giant', 'large', 'medium', 'small', 'tiny'],
    },
    disabled: {
      control: 'radio',
      options: [true, false],
    },
    startIcon: {
      control: undefined,
    },
    loading: {
      control: 'radio',
      options: [true, false],
    },
    endIcon: {
      control: undefined,
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'giant',
    rounded: 'giant',
    startIcon: <ArrowLeft />,
    endIcon: <ArrowRight />,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Grouping primary variants together
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const IconButton: Story = {
  args: {
    variant: 'primary',
    startIcon: <ArrowUp />,
    endIcon: undefined,
    children: undefined,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};
