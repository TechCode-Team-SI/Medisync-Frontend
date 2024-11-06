/* eslint-disable prettier/prettier */

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { FieldQuestion } from 'src/services/api/interface';
import { FieldQuestionHttp } from 'src/services/api/question';
import { cn, parseText } from 'src/utils';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

import { Button } from '../ui/button';
import { CardTitle } from '../ui/card';
import Spinner from '../ui/icons/spinner';
import { Input } from '../ui/input';

interface FormOptionProps {
  initialSelectedQuestionId?: string;
  onSelection?: (question: FieldQuestion) => void;
  closeModal?: () => void;
  blackListQuestionIds?: string[];
}

export function FormOption({
  initialSelectedQuestionId,
  blackListQuestionIds,
  onSelection,
  closeModal,
}: FormOptionProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>(initialSelectedQuestionId);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const { data: question, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `get-questions`],
    queryFn: ({ queryKey }) => FieldQuestionHttp.getFieldQuestion({ search: queryKey[0] }),
  });

  const onSelect = () => {
    if (onSelection && selectedQuestion) {
      const foundQuestion = question?.data.find((q) => q.id === selectedQuestion);
      if (!foundQuestion) return;
      onSelection(foundQuestion);
      setSelectedQuestion(undefined);
      if (closeModal) closeModal();
    }
  };

  return (
    <DialogContent className='min-w-[529px] max-w-[429px] min-h-[599px] max-h-[600px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'>
      <DialogHeader className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>Opciones de Formulario</DialogTitle>
      </DialogHeader>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6'>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <div className='flex pb-4'>
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Buscar'
              className='w-full h-10 rounded-2 font-roboto text-base pl-5 font-medium text-green-400 hover:text-green-400 '
            />
          </div>

          <div className='flex flex-col pt-2 w-full overflow-auto scrollbar-edit h-[420px] gap-3 '>
            {question?.data && !isFetching ? (
              question.data
                .filter((q) => !blackListQuestionIds?.includes(q.id))
                .map((question) => (
                  <Button
                    onClick={() => setSelectedQuestion(question.id)}
                    key={question.id}
                    className={cn(
                      'sm:w-[425px] transition-all h-32 transform bg-white shadow-lg border-none flex flex-col px-5 py-4 hover:bg-green-100 items-start',
                      selectedQuestion === question.id ? 'bg-green-100 scale-95' : '',
                    )}
                  >
                    <CardTitle className='w-full font-roboto text-lg font-bold flex text-green-400 hover:text-green-400'>
                      {question.name}
                    </CardTitle>
                    <span className='text-gray-600 text-sm font-medium'>{question.label}</span>
                    <span className='text-gray-400 text-sm text-wrap text-start line-clamp-2'>
                      {parseText(question.description || '')}
                    </span>
                  </Button>
                ))
            ) : (
              <div className='w-full flex justify-center'>
                <Spinner />
              </div>
            )}
          </div>
          <div className='flex flex-row justify-center pt-5 '>
            <Button
              disabled={!selectedQuestion}
              onClick={onSelect}
              className='w-[420px] py-6 rounded-[10px] text-[20px] '
              variant={'btnGreen'}
            >
              Seleccionar
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
