import { useMutation, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { Confirmation } from 'src/components/alerts/confirmation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { requestTemplateHttp } from 'src/services/api/requestTemplate';
import { specialtiesHttp } from 'src/services/api/specialties';
import { cn, parseText } from 'src/utils';
import { DEBOUNCE_DELAY } from 'src/utils/constants';

import { Button } from '../../ui/button';
import { CardTitle } from '../../ui/card';
import Spinner from '../../ui/icons/spinner';
import { Input } from '../../ui/input';

interface RequestTemplateSelectModalProps {
  specialtyData: { id: string; hasAssignedTemplate: boolean };
  onSelect?: () => void;
  initialSelectedQuestionId?: string;
  closeModal?: () => void;
}

export function RequestTemplateSelectModal({
  initialSelectedQuestionId,
  closeModal,
  specialtyData,
  onSelect,
}: RequestTemplateSelectModalProps) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedRequestTemplate, setRequestTemplate] = useState<string | undefined>(initialSelectedQuestionId);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const { data: requestTemplates, isFetching } = useQuery({
    queryKey: [debouncedSearchTerm, `get-requestTemplates`],
    queryFn: ({ queryKey }) => requestTemplateHttp.getRequestTemplate({ search: queryKey[0] }),
  });
  const assignTemplate = useMutation({
    mutationFn: specialtiesHttp.putAssignTemplate,
    onSuccess: () => {
      setRequestTemplate(undefined);
      if (onSelect) onSelect();
      if (closeModal) closeModal();
    },
  });

  const onSelection = () => {
    if (specialtyData.hasAssignedTemplate) {
      setOpenConfirmModal(true);
    } else {
      onAssignTemplate();
    }
  };

  const onAssignTemplate = () => {
    if (!selectedRequestTemplate) return;
    assignTemplate.mutate({ id: specialtyData.id, templateId: selectedRequestTemplate });
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
            {requestTemplates?.data && !isFetching ? (
              requestTemplates.data.map((requestTemplate) => (
                <Button
                  onClick={() => setRequestTemplate(requestTemplate.id)}
                  key={requestTemplate.id}
                  className={cn(
                    'sm:w-[425px] transition-all h-32 transform bg-white shadow-lg border-none flex flex-col px-5 py-4 hover:bg-green-100 items-start',
                    selectedRequestTemplate === requestTemplate.id ? 'bg-green-100 scale-95' : '',
                  )}
                >
                  <CardTitle className='w-full font-roboto text-lg font-bold flex text-green-400 hover:text-green-400'>
                    {requestTemplate.name}
                  </CardTitle>
                  <span className='text-gray-400 text-sm text-wrap text-start line-clamp-2'>
                    {parseText(requestTemplate.description || '')}
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
              onClick={onSelection}
              isLoading={assignTemplate.isPending}
              disabled={!selectedRequestTemplate}
              className='w-[420px] py-6 rounded-[10px] text-[20px] '
              variant={'btnGreen'}
            >
              Seleccionar
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <Confirmation
          title='Estas seguro de cambiar de plantilla?'
          description='esta accion cancelara las citas programadas para esta especialidad'
          onConfirm={onAssignTemplate}
        />
      </Dialog>
    </DialogContent>
  );
}
