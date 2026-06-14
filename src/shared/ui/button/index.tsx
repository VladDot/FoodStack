import { Loader } from '@/shared/assets/icons';
import { cn } from '@/shared/utils';

import React from 'react';

import { getStyles } from './styles';
import { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isActive,
      children,
      disabled,
      leftIcon,
      className,
      rightIcon,
      isLoading,
      size = 'md',
      asChild = false,
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    const styles = getStyles({
      isActive,
      variant,
      size,
      asChild,
      className,
      disabled,
      isLoading,
    });

    if (asChild && children) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
      }>;

      return React.cloneElement(child, {
        className: cn(styles.button, child.props.className, className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={styles.button} disabled={disabled || isLoading} {...props}>
        {isLoading ? (
          <Loader className="size-6" />
        ) : (
          <>
            {leftIcon}
            {children && <span>{children}</span>}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
