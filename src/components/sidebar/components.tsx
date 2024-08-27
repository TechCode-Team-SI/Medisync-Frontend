import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from 'src/utils';

const SidebarContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col min-w-[268px] max-w-[268px] h-full bg-green-400', className)}
      {...props}
    />
  ),
);
SidebarContainer.displayName = 'SidebarContainer';

const SidebarLogoContainer = React.forwardRef<HTMLDivElement, React.AllHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('w-full flex min-h-16 max-h-32 pb-10 pt-14 justify-center items-center', className)}
      {...props}
    />
  ),
);

SidebarLogoContainer.displayName = 'SidebarLogoContainer';

const SidebarOptions = React.forwardRef<HTMLDivElement, React.AllHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col w-full h-full max-h-full overflow-y-auto scrollbar-edit p-6', className)}
      {...props}
    />
  ),
);

SidebarOptions.displayName = 'SidebarOptions';

const SideBarList = React.forwardRef<HTMLUListElement, React.AllHTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => <ul ref={ref} className={className} {...props} />,
);

SideBarList.displayName = 'SidebarList';

const SidebarDescription = React.forwardRef<HTMLLIElement, React.AllHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('pl-3 mb-2 text-green-700 font-bold text-sm font-montserrat', className)} {...props} />
  ),
);

SidebarDescription.displayName = 'SidebarDescription';

const SidebarContainerLink = React.forwardRef<HTMLLIElement, React.AllHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('flex flex-col', className)} {...props} />,
);

SidebarContainerLink.displayName = 'SidebarContainerLink';

const sidebarLinkVariants = cva('', {
  variants: {
    variant: {
      primary:
        'mb-2 px-3 flex w-full h-9 rounded-2xl transition-colors bg-green-500 items-center hover:bg-white text-white hover:text-green-500 font-bold text-[14px] font-montserrat',
      secondary:
        'w-10/12 mb-2 px-3 flex self-end h-9 rounded-2xl transition-colors bg-green-300 hover:bg-white items-center text-white hover:text-green-300 font-bold text-[14px] font-montserrat',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface SidebarLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarLinkVariants> {
  to: string;
}

const SidebarLink = React.forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  ({ to = '/', className, variant, ...props }, ref) => {
    return <Link to={to} className={cn(sidebarLinkVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
SidebarLink.displayName = 'SidebarLink';

const SidebarTextLink = React.forwardRef<HTMLParagraphElement, React.AllHTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p className={cn('truncate', className)} ref={ref} {...props} />;
  },
);
SidebarTextLink.displayName = 'SidebarTextLink';

const SidebarCopyRightContainer = React.forwardRef<HTMLDivElement, React.AllHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full h-28 flex flex-col justify-center  items-center', className)} {...props} />
  ),
);

SidebarCopyRightContainer.displayName = 'SidebarCopyRightContainer';

const SidebarCopyRight = React.forwardRef<HTMLParagraphElement, React.AllHTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('pl-3 text-white font-bold text-2xl font-montserrat', className)} {...props} />
  ),
);

SidebarCopyRight.displayName = 'SidebarCopyRight';

export {
  SidebarContainer,
  SidebarContainerLink,
  SidebarDescription,
  SidebarLink,
  SidebarTextLink,
  SideBarList,
  SidebarLogoContainer,
  SidebarOptions,
  SidebarCopyRightContainer,
  SidebarCopyRight,
};
