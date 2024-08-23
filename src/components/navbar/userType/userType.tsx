import User from '../../ui/icons/user';

export function UserType() {
  return (
    <div className='flex items-center'>
      <User className='fill-current text-green-400 w-[23px] h-[22px] mr-3' />
      <div className='flex flex-col justify-center'>
        <p className='text-[14px] font-bold font-montserrat'>Usuario</p>
        <p className='text-[12px] font-montserrat'>Tipo de usuario</p>
      </div>
    </div>
  );
}
