/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, DialogClose, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { Form } from 'src/components/ui/form';
import Img from 'src/components/ui/icons/img';
import { Loading } from 'src/components/ui/loading';
import { fileHttp } from 'src/services/api/file';

import { Image } from '../../../services/api/interface';
import { ArticlesHttp } from '../../../services/api/post/index';
import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { PostSchema } from './schema';

interface AlertName {
  title: string;
  alert: string;
  id?: string;
  titlePost?: string;
  descriptionPost?: string;
  onClose?: () => void;
  Recargar?: () => void;
}
export function RegisterPost({ title, alert, id, descriptionPost, titlePost, onClose, Recargar }: AlertName) {
  const form = useForm<PostSchema>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: titlePost, description: descriptionPost },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const Articles = useMutation({
    mutationKey: [''],
    mutationFn: ArticlesHttp.postArticles,
    onSuccess: () => {
      console.log('creado');
      Recargar;
    },
    onError: () => {
      console.log(Articles.error?.message);
    },
  });
  const EditArticles = useMutation({
    mutationKey: [''],
    mutationFn: ArticlesHttp.patchArticles,
    onSuccess: () => {
      console.log('Editado');
      Recargar;
    },
    onError: () => {
      console.log(Articles.error?.message);
    },
  });

  const FileUpload = useMutation({
    mutationKey: [''],
    mutationFn: fileHttp.postFile,
    onSuccess: () => {
      console.log('imagen subida');
    },
    onError: () => {
      console.log(Articles.error?.message);
    },
  });

  const onSubmit = async (data: PostSchema) => {
    let upload: Image | undefined;
    if (image) {
      upload = await FileUpload.mutateAsync({ fileLoad: image });
    }
    if (!id) {
      Articles.mutate({
        title: data.title,
        description: data.description,
        photo: upload ? { id: upload.id } : undefined,
      });
      Recargar;
    } else {
      EditArticles.mutate({
        id: id,
        title: data.title,
        description: data.description,
        photo: upload ? { id: upload.id } : undefined,
      });
      Recargar;
    }
  };

  if (Articles.isPending || FileUpload.isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center relative'>
        <Loading />
      </div>
    );
  }

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[429px] max-w-[529px] min-h-[403px] max-h-[500px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
    >
      <div className='absolute flex w-full h-14 items-center justify-center px-20'>
        <DialogTitle className='flex font-bold text-white text-[16px] text-center'>{title}</DialogTitle>
      </div>
      <div className='relative w-full h-full flex flex-col rounded-b-lg bg-white px-10 py-6 '>
        <div className='flex flex-col w-full justify-center space-x-2'>
          <Form {...form}>
            <form className='space-y-4 ' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex  flex-col'>
                <Label htmlFor='name' className='text-green-400 font-roboto font-bold h-7 text-[14px]'>
                  Titulo
                </Label>
                <Input id='title' className='w-full h-11 rounded-2 font-roboto text-base' {...form.register('title')} />
                {form.formState.errors.title && (
                  <span className='text-red-500'>{form.formState.errors.title.message}</span>
                )}
                <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
                  Contenido
                </Label>
                <Input
                  id='description'
                  className='w-full  h-28 rounded-3 font-roboto text-base line-clamp-5 '
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <span className='text-red-500'>{form.formState.errors.description.message}</span>
                )}
                <Label htmlFor='description' className='text-green-400 font-roboto font-bold h-7 mt-5 text-[14px]'>
                  Seleccione Imagen
                </Label>
                <div className='flex flex-row items-center justify-center space-x-2'>
                  <Input type='file' id='image' className='hidden' accept='image/*' onChange={handleFileChange} />
                  <Label htmlFor='image' className=' cursor-pointer'>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt='Vista Previa'
                        className='mt-4 rounded-lg w-12 h-20'
                        style={{ width: '100%', height: '120px' }}
                      />
                    ) : (
                      <Img className=' fill-current text-green-400 w-10 h-10' />
                    )}
                  </Label>
                </div>
              </div>

              <div className='flex flex-row justify-center p-4'>
                <Button
                  className='w-[136px] h-[46px] rounded-[10px] mr-6'
                  variant={'btnGreen'}
                  type='submit'
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Guardar
                </Button>
                <Dialog modal={true} open={openModal}>
                  <AlertCheck title={`¡${alert}!`} onClose={() => setOpenModal(false)} />
                </Dialog>
                <DialogClose>
                  <Button className='w-[136px] h-[46px] rounded-[10px]' variant={'btnGray'} type='button'>
                    Cancelar
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DialogContent>
  );
}
