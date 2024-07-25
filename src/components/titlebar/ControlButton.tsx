import { cn } from 'src/utils/utils';

interface IControlButtonProps {
  name: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | React.KeyboardEventHandler<HTMLDivElement>;
  path: string;
}

export const ControlButton: React.FC<IControlButtonProps> = ({ className, name, onClick, path }) => {
  const title = name[0].toUpperCase() + name.substring(1);

  return (
    <div
      role='button'
      aria-label={name}
      className={cn('px-5 text-sm flex h-full justify-center items-center no-draggable hover:bg-blue-400', className)}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      onKeyDown={onClick as React.KeyboardEventHandler<HTMLDivElement>}
      title={title}
      tabIndex={0}
    >
      <svg aria-hidden='true' version='1.1' width='10' height='10'>
        <path fill='currentColor' d={path} />
      </svg>
    </div>
  );
};
