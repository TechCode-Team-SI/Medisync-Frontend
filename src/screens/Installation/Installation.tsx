/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

import { Button } from 'src/components/ui/button';

import installationImage from '../../../assets/img/installationImage.png';

export function Installation() {
  return (
    <div className='flex w-full h-full bg-white'>
      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={installationImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>
      <div className='w-1/2 h-full flex flex-col justify-center p-10 gap-10'>
        <div className='text-[#539091] text-[30px] font-montserrat font-bold text-center flex flex-col gap-8'>
          <h1>Bienvenido a MediSync</h1>
          <p className='text-black text-[20px] font-roboto font-normal h-min text-justify'>
            Esta guía rápida lo llevará a través del proceso de instalación de manera sencilla. Solo tomará unos minutos
            para configurar todo y comenzar a disfrutar de las increíbles características de nuestra aplicación.
          </p>
          <p className='text-black text-[20px] font-roboto font-semibold text-left'>
            Haga click en &quot;Siguiente&quot; para continuar.
          </p>
          <div className='flex text-[#969696] text-[14px] font-medium '>
            <input
              type='checkbox'
              id='terms'
              className='form-checkbox h-5 w-5 rounded-lg border-4 border-green-300 focus:ring-blue-500 mr-2 accent-green-500 bg-green-500'
            />
            <label htmlFor='terms'>He leído y acepto los términos y condiciones.</label>
          </div>
        </div>
        <div className=' flex text-center items-center justify-center self-center'>
          <Link to='/host-token'>
            <Button variant='btnGreen' className='w-[325px] h-[52px] text-[20px]'>
              Siguiente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
