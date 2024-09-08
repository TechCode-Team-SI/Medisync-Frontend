import { SVGProps } from 'react';

interface SwitchProps extends SVGProps<SVGSVGElement> {
  isOn: boolean; // Indica si el switch está encendido o apagado
  circleFill?: string; // Color del círculo
  onClick?: () => void; // Manejador de clic
}

const Switch = ({ isOn, circleFill = 'white', onClick, ...props }: SwitchProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 96 48' // Duplicar el tamaño del viewport
    onClick={onClick}
    {...props}
  >
    {/* Rectángulo del fondo */}
    <rect
      x='0'
      y='0' // Ajustar para centrar verticalmente
      width='96' // Duplicar el ancho
      height='48' // Duplicar la altura
      rx='24' // Duplicar el radio del borde
      fill={isOn ? '#5cc1b3' : '#ccc'} // Color verde cuando está encendido
    />

    {/* Círculo que se mueve */}
    <circle cx={isOn ? '72' : '24'} cy='24' r='20' fill={circleFill} />
  </svg>
);

export default Switch;
