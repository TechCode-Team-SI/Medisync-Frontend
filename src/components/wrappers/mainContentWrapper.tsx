import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import Search from 'src/components/ui/icons/search';
import { Input } from 'src/components/ui/input';
import { cn } from 'src/utils';

interface MainContentWrapperProps {
  children: React.ReactNode;
  bodyClassName?: string;
}

export function MainContentWrapper({ children, bodyClassName }: MainContentWrapperProps) {
  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20 flex-none'>
          <UserType />
        </Card>
        <Card
          className={cn(
            'bg-white w-full rounded-b-none flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5 h-full grow overflow-hidden',
            bodyClassName,
          )}
        >
          {children}
        </Card>
      </Card>
    </div>
  );
}

function MainContentHeader({
  setSearchTerm,
  title,
  withBrowser,
  children,
}: {
  withBrowser?: boolean;
  setSearchTerm?: (term: string) => void;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <CardHeader className='w-full flex p-3 flex-col space-y-5 shrink-0 h-fit'>
      <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>{title}</CardTitle>
      {withBrowser && (
        <div className='w-full h-full flex flex-row gap-5'>
          <Input
            onChange={(e) => {
              if (setSearchTerm) setSearchTerm(e.target.value);
            }}
            placeholder='Buscar'
            className='w-full h-[36px] bg-green-100/50 border-none rounded-md text-[15px] font-montserrat placeholder:text-green-400 placeholder:font-roboto placeholder:font-bold placeholder:text-[15px] focus-visible:ring-green-400'
          ></Input>
          <Button variant='btnGreen' className='h-[36px]'>
            <Search className='h-[17px] w-[17px] fill-current text-white mr-2' />
            Buscar
          </Button>
        </div>
      )}
      {children}
    </CardHeader>
  );
}

function MainContentBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <CardContent className={cn('overflow-auto scrollbar-edit flex flex-col gap-5 grow flex-1', className)}>
      {children}
    </CardContent>
  );
}

function MainContentFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <CardFooter className={cn('h-fit', className)}>{children}</CardFooter>;
}

MainContentWrapper.Header = MainContentHeader;
MainContentWrapper.Body = MainContentBody;
MainContentWrapper.Footer = MainContentFooter;
