/* eslint-disable prettier/prettier */
import { FunctionComponent, CSSProperties } from 'react';

export type AttendType = {
  className?: string;
  atender?: string;
  onClick?: () => void;
  propWidth?: CSSProperties['width'];
  propBackgroundColor?: CSSProperties['backgroundColor'];
  propWidth1?: CSSProperties['width'];
  propBackgroundColor1?: CSSProperties['backgroundColor'];
};

const Attend: FunctionComponent<AttendType> = ({
  className = '',
  propWidth,
  propBackgroundColor,
  propWidth1,
  propBackgroundColor1,
  atender = 'Atender',
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
      className={`w-[163px] h-[46px] rounded-[10px] bg-green-500 mx-auto text-center text-[15px] text-white tracking-widest font-montserrat${className}`}
      style={groupDivStyle}
      onClick={onClick}
      aria-label={atender}
    >
      <div className='' style={rectangleDivStyle} />
      <b className=''>{atender}</b>
    </button>
  );
};

export default Attend;
