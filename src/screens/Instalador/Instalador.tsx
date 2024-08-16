/* eslint-disable prettier/prettier */
import { Button } from 'src/components/ui/button';

import instaladorImage from '../../../assets/img/Instalador.png';

export function Instalador() {
  return (
    <div className='flex w-849 h-604 bg-white'>
      <div className='w-1/2 flex flex-col items-center justify-center bg-[#68C3B7] '>
        <img src={instaladorImage} alt='Imagen estática' className='w-402 h-500 ' />
      </div>

      <div className='w-1/2 flex flex-col '>
        <div className='text-[#539091] text-[30px] font-montserrat font-bold text-center flex flex-col items-center pt-20  '>
          <p>Bienvenido a</p>
          <p>MediSync</p>
        </div>
        <div className='text-black text-[20px] font-roboto font-normal h-min text-justify flex flex-col pl-8 pr-9 pt-7'>
          <p>
            Esta guía rápida lo llevará a través del proceso de instalación de manera sencilla. Solo tomará unos minutos
            para configurar todo y comenzar a disfrutar de las increíbles características de nuestra aplicación.
          </p>
        </div>
        <div className='text-black text-[20px] font-roboto font-semibold flex-col pl-8 pr-10 pt-7'>
          <p>Haga click en "Siguiente" para continuar.</p>
        </div>

        <div className='flex mb-4 pl-10 pr-10 pt-9 text-[#969696] text-[14px]  font-medium '>
          <input
            type='checkbox'
            id='terms'
            className='form-checkbox h-5 w-5 rounded-lg border-4 border-green-300 focus:ring-blue-500 mr-2 accent-green-500 bg-green-500'
          />
          <label htmlFor='terms'>He leído y acepto los términos y condiciones.</label>
        </div>
        <div className=' flex text-center items-center justify-center self-center pt-5 '>
          <Button variant='start'> Siguiente</Button>
        </div>
      </div>
    </div>
  );
}
