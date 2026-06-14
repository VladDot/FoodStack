import React from 'react';

import { getStyles } from './styles';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ invalid, className, ...props }, ref) => {
    const { input } = getStyles({ invalid, className });
    return (
      <input
        {...props}
        ref={ref}
        value={props.value ?? ''}
        type={props.type || 'text'}
        className={input}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
