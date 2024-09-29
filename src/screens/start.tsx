import { Link } from 'react-router-dom';

import { Button } from 'src/components/ui/button';
import { CardTitle } from 'src/components/ui/card';
import Logo from 'src/components/ui/icons/logo';

export function Start() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-green-300'>
      <div className='absolute inset-0 flex justify-center items-center'>
        <Logo className='fill-current text-white w-full h-full max-w-xs max-h-xs sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg opacity-15' />
      </div>
      <div className='absolute inset-0 flex flex-col justify-center items-center space-y-8 sm:space-y-6 lg:space-y-8'>
        <Logo className='fill-current text-white w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72' />
        <CardTitle className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-center'>
          MediSync
        </CardTitle>
        <Link to='/login'>
          <Button className='bg-white h-10 w-40 rounded-lg text-base font-montserrat font-bold text-green-400 hover:bg-green-100 text-[18px] sm:text-[20px]'>
            Iniciar Sesión
          </Button>
        </Link>
        <Link to='/createUser'>
          <CardTitle className='text-white text-[18px] sm:text-xl md:text-xl lg:text-2xl underline font-montserrat font-bold text-center'>
            Instalar
          </CardTitle>
        </Link>
        <CardTitle className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-roboto font-bold absolute bottom-4 sm:bottom-6 md:bottom-8'>
          Por TechCode
        </CardTitle>
      </div>
    </div>
  );
}