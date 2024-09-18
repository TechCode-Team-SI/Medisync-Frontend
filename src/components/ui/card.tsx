import * as React from 'react';

import { cn } from 'src/utils';

//import { AlertExclamation2 } from '../alerts/alertExclamation2';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
      className,
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-slate-500 dark:text-slate-400', className)} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />,
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

const CardImg = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: React.ReactNode }
>(({ className, alt = '', src = 'assets/img/installationImage.png', fallback, ...props }, ref) => {
  const [isValidSrc, setIsValidSrc] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!src) {
      setIsValidSrc(false);
      return;
    }

    const img = new Image();
    img.src = src;

    const handleLoad = () => setIsValidSrc(true);
    const handleError = () => setIsValidSrc(false);

    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!isValidSrc) {
    return <>{fallback}</>; // Retornar el SVG o cualquier nodo React que se pase por la prop fallback
  }

  return <img ref={ref} alt={alt} src={src} className={cn('w-full object-cover', className)} {...props} />;
});

CardImg.displayName = 'CardImg';

const CardSvg = React.forwardRef<HTMLOrSVGElement, React.HTMLAttributes<HTMLOrSVGElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref as React.Ref<HTMLDivElement>} className={cn('h-20 w-20', className)} {...props} />
  ),
);
CardSvg.displayName = 'CardSvg';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImg, CardSvg, CardTitle };
