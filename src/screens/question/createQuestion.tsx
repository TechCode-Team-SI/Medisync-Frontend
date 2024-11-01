/* eslint-disable prettier/prettier */
import { Select } from '@radix-ui/react-select';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import { UserType } from 'src/components/navbar/userType/userType';
import { Button } from 'src/components/ui/button';
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from 'src/components/ui/card';
import { Checkbox } from 'src/components/ui/checkbox';
import User from 'src/components/ui/icons/user';
import { Input } from 'src/components/ui/input';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';

export function createQuestion() {
  const [optionIdCounter, setOptionIdCounter] = useState(3);
  const [casillaIdCounter, setCasillaIdCounter] = useState(3);

  // Estados separados para casillas y opciones
  const [casillas, setCasillas] = useState([
    { id: 1, text: 'Casilla 1' },
    { id: 2, text: 'Casilla 2' },
  ]);
  const [opciones, setOpciones] = useState([
    { id: 1, text: 'Opción 1' },
    { id: 2, text: 'Opción 2' },
  ]);

  const [questionType, setQuestionType] = useState(''); // Estado para manejar el tipo de respuesta

  // Métodos exclusivos para "Casillas"
  const addCasilla = () => {
    const newCasilla = { id: casillaIdCounter, text: `Casilla ${casillaIdCounter}` };
    setCasillas([...casillas, newCasilla]);
    setCasillaIdCounter(casillaIdCounter + 1);
  };

  const removeCasilla = (id: number) => {
    setCasillas(casillas.filter((casilla) => casilla.id !== id));
  };

  const updateCasillaText = (id: number, newText: string) => {
    setCasillas(casillas.map((casilla) => (casilla.id === id ? { ...casilla, text: newText } : casilla)));
  };

  // Métodos exclusivos para "Opciones"
  const addOpcion = () => {
    const newOpcion = { id: optionIdCounter, text: `Opción ${optionIdCounter}` };
    setOpciones([...opciones, newOpcion]);
    setOptionIdCounter(optionIdCounter + 1);
  };

  const removeOpcion = (id: number) => {
    setOpciones(opciones.filter((opcion) => opcion.id !== id));
  };

  const updateOpcionText = (id: number, newText: string) => {
    setOpciones(opciones.map((opcion) => (opcion.id === id ? { ...opcion, text: newText } : opcion)));
  };

  // Manejar el cambio en el tipo de pregunta
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value);
  };

  return (
    <div className='w-full h-full flex flex-col items-center bg-green-400 relative'>
      <Card className='h-full w-full flex flex-col px-8 sm:px-9 lg:px-10 pt-8 sm:pt-9 lg:pt-10 bg-green-600 border-none rounded-none rounded-l-xl'>
        <Card className='bg-white min-h-[60px] max-h-[60px] w-full mb-4 flex fles-row justify-end items-center px-5 sm:px-10 lg:px-20'>
          <UserType />
        </Card>
        <Card className='bg-white w-full h-full rounded-b-none overflow-auto scrollbar-edit flex flex-col p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0 space-y-5'>
          <CardHeader className='w-full flex p-3 flex-col space-y-5'>
            <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left'>
              CREAR PREGUNTA
            </CardTitle>
          </CardHeader>
          <CardContent className='overflow-auto scrollbar-edit'>
            <Card className='w-full grow sm:w-364 h-251 shadow-md border-none flex flex-col p-5 gap-5'>
              <div className='flex flex-grow'>
                <div className='flex w-1/2 flex-grow'>
                  <Input
                    placeholder='Título de la pregunta'
                    className='mt-1 h-51 bg-green-100/50 border-none rounded-md text-[14px] focus-visible:ring-green-400'
                  />
                </div>
                <div className='flex flex-col h-[51px] w-1/2 pl-12 pt-1'>
                  <Select onValueChange={handleQuestionTypeChange}>
                    <SelectTrigger id='options' className='h-[40px] border border-gray-300 rounded bg-white'>
                      <SelectValue placeholder='Seleccione la casilla' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='texto'>
                          <User fill='#539091' className='h-[17px] w-[18px] absolute mt-[3px]' />
                          <span className='ml-6'>Texto</span>
                        </SelectItem>
                        <SelectItem value='casillas'>
                          <Checkbox checked={true} className='h-[17px] w-[18px] absolute mt-[3px]' />
                          <span className='ml-6'>Casillas</span>
                        </SelectItem>
                        <SelectItem value='opciones'>
                          <Checkbox checked={true} className='h-[17px] w-[18px] absolute mt-[3px] rounded-full' />
                          <span className='ml-6'>Opciones</span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mostrar componente dinámico basado en el tipo de pregunta */}
              {questionType === 'texto' && (
                <div className='flex flex-col'>
                  <Input
                    placeholder='Respuesta de texto'
                    className='mt-1 h-51 bg-green-100/50 border-none text-[14px] focus-visible:ring-green-400 bg-gray-50 border border-gray-300 rounded px-2'
                  />
                </div>
              )}

              {questionType === 'casillas' && (
                <div className='space-y-2'>
                  {casillas.map((casilla) => (
                    <div key={casilla.id} className='flex items-center gap-2'>
                      <Checkbox className='h-5 w-5
                      ' />
                      <Input
                        value={casilla.text}
                        onChange={(e) => updateCasillaText(casilla.id, e.target.value)}
                        className='flex-1 h-10 bg-gray-50 border border-gray-300 rounded px-2'
                      />
                      <Button
                        onClick={() => removeCasilla(casilla.id)}
                        className='text-red-400 bg-gray-50 hover:bg-green-200'
                      >
                        <X className='h-5 w-5' />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={addCasilla}
                    className='flex items-center gap-2 text-gray-50 bg-green-300 hover:bg-green-200'
                  >
                    <Plus className='h-5 w-5' /> Añadir otra casilla
                  </Button>
                </div>
              )}

              {questionType === 'opciones' && (
                <div className='space-y-2'>
                  {opciones.map((opcion) => (
                    <div key={opcion.id} className='flex items-center gap-2'>
                      <Checkbox className='h-5 w-5 rounded-full' />
                      <Input
                        value={opcion.text}
                        onChange={(e) => updateOpcionText(opcion.id, e.target.value)}
                        className='flex-1 h-10 bg-gray-50 border border-gray-300 rounded px-2'
                      />
                      <Button
                        onClick={() => removeOpcion(opcion.id)}
                        className='text-red-400 bg-gray-50 hover:bg-green-200'
                      >
                        <X className='h-5 w-5' />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={addOpcion}
                    className='flex items-center gap-2 text-gray-50 bg-green-300 hover:bg-green-200'
                  >
                    <Plus className='h-5 w-5' /> Añadir otra opción
                  </Button>
                </div>
              )}
            </Card>
          </CardContent>
          <CardFooter className='h-20 flex flex-row-reverse'>
            <Button className='bg-green-400 rounded-full w-[157px] h-[37px] mt-18 text-gray-50 text-[18px] font-roboto font-bold'>
              Crear
            </Button>
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}
