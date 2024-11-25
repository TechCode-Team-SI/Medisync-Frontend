import { useSessionStore } from 'src/store/sessionStore';

import User from '../../ui/icons/user';

export function UserType() {
  const { user } = useSessionStore();

  const ownerRole = user()?.roles?.find((role) => role.name === 'Dueño');
  const roleName = ownerRole ? ownerRole.name : user()?.roles?.[0]?.name || 'No role';

  return (
    <div className='flex items-center'>
      <User className='fill-current text-green-400 w-[23px] h-[22px] mr-3' />
      <div className='flex flex-col justify-center'>
        <p className='text-[14px] font-bold font-montserrat'>{user()?.fullName}</p>
        <p className='text-[12px] font-montserrat'>{roleName}</p>
      </div>
    </div>
  );
}
