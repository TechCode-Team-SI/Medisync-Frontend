import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react';

import { Button } from './button';
import { Input } from './input';

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isDisabled?: boolean;
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(({ isDisabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} ref={ref} {...props} />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={isDisabled}
      >
        {showPassword && !isDisabled ? (
          <EyeIcon className='h-4 w-4' aria-hidden='true' />
        ) : (
          <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
        )}
        <span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';
