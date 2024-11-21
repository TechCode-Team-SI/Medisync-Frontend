import Spinner from '../ui/icons/spinner';

interface LoadingWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const LoadingWrapper = ({ children, isLoading }: LoadingWrapperProps) => {
  if (isLoading)
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  return <>{children}</>;
};

export default LoadingWrapper;
