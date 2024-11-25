interface FieldWrapperProps {
  children: React.ReactNode;
  className?: string;
  errorState?: {
    message?: string;
  };
}

const FieldWrapper = ({ children, errorState, className }: FieldWrapperProps) => {
  return (
    <div className={className}>
      {children}
      {errorState?.message && <span className='text-red-400'>{errorState.message}</span>}
    </div>
  );
};

export default FieldWrapper;
