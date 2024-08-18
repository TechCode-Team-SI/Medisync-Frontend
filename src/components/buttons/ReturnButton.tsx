/* eslint-disable prettier/prettier */
import { FunctionComponent, CSSProperties } from 'react';

export type ReturnType = {
  className?: string;
  volver?: string;
  onClick?: () => void;
  propWidth?: CSSProperties['width'];
  propBackgroundColor?: CSSProperties['backgroundColor'];
  propWidth1?: CSSProperties['width'];
  propBackgroundColor1?: CSSProperties['backgroundColor'];
};

const Return: FunctionComponent<ReturnType> = ({
  className = '',
  propWidth,
  propBackgroundColor,
  propWidth1,
  propBackgroundColor1,
  volver = 'Volver',
  onClick,
}) => {
  const groupDivStyle: CSSProperties = {
    width: propWidth,
    backgroundColor: propBackgroundColor,
  };

  const rectangleDivStyle: CSSProperties = {
    width: propWidth1,
    backgroundColor: propBackgroundColor1,
  };

  return (
    <button
      className={`w-[163px] h-[46px] rounded-[10px] bg-gray-400 mx-auto text-center font-bold text-[15px] tracking-widest text-white font-montserrat ${className}`}
      style={groupDivStyle}
      onClick={onClick}
      aria-label={volver}
    >
      <div
        className=''
        style={rectangleDivStyle}
      />
      <b className=''>
        {volver}
      </b>
    </button>
  );
};

export default Return;
