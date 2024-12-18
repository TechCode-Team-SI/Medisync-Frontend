/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { Badge } from 'src/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';
import { Form } from 'src/components/ui/form';
import Img from 'src/components/ui/icons/img';
import Spinner from 'src/components/ui/icons/spinner';
import { TextArea } from 'src/components/ui/textArea';
import { articleCategoryHttp } from 'src/services/api/article-category';
import { fileHttp } from 'src/services/api/file';
import { Articles, FileImage } from 'src/services/api/interface';

import { ArticlesHttp } from '../../../services/api/post/index';
import { AlertCheck } from '../../alerts/alertCheck';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { SelectElements } from '../appointments/SelectElements';

import { PostSchema } from './schema';

interface AlertName {
  title: string;
  alert: string;
  post?: Articles;
  onClose?: () => void;
  Recargar?: () => void;
}
export function RegisterPost({ title, post, alert, onClose, Recargar = () => {} }: AlertName) {
  const form = useForm<PostSchema>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: post?.title, description: post?.description, categories: post?.categories },
  });

  const [modalCheckOpen, setModalCheckOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

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
      setModalCheckOpen(true);
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
      setModalCheckOpen(true);
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
    let upload: FileImage | undefined;
    if (image) {
      upload = await FileUpload.mutateAsync({ fileLoad: image });
    }
    if (!post?.id) {
      console.log(upload?.file.id);
      Articles.mutate({
        title: data.title,
        description: data.description,
        categories: data.categories.map((cat) => cat.id),
        photo: upload?.file ? { id: upload.file.id } : undefined,
      });
    } else {
      console.log(post);
      let idImagen = post ? (post.photo ? post.photo.id : '') : '';
      if (upload) {
        idImagen = upload?.file.id;
      }
      EditArticles.mutate({
        id: post?.id,
        title: data.title,
        description: data.description,
        categories: data.categories.map((cat) => cat.id),
        photo: { id: idImagen },
      });
    }
  };

  const values = useWatch({ control: form.control });

  return (
    <DialogContent
      onCloseAutoFocus={onClose}
      className='min-w-[429px] max-w-[529px] min-h-[403px] rounded-lg bg-green-400 border-none px-0 pt-14 pb-0'
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
                <TextArea
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
                    ) : post ? (
                      post.photo ? (
                        <div className='flex justify-center items-center w-[85px] h-[85px]'>
                          <img
                            src={post.photo.path}
                            alt='Vista Previa'
                            className='mt-4 rounded-lg w-12 h-20'
                            style={{ width: 'auto', height: '75px' }}
                          />
                        </div>
                      ) : (
                        <Img className=' fill-current text-green-400 w-10 h-10' />
                      )
                    ) : (
                      <Img className=' fill-current text-green-400 w-10 h-10' />
                    )}
                  </Label>
                </div>
                <Controller
                  control={form.control}
                  name='categories'
                  render={({ field }) => (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className='text-sm py-1 my-4 w-44' variant='btnGreen' type='button'>
                          Seleccionar categorias
                        </Button>
                      </DialogTrigger>
                      <SelectElements
                        selectedElements={field.value}
                        onSelect={field.onChange}
                        queryFn={articleCategoryHttp.getArticleCategory}
                        queryKey='injury'
                        title='Categoria'
                      />
                    </Dialog>
                  )}
                />
                <div className='rounded-md border border-green-300 p-4 mx-4 flex flex-wrap gap-2'>
                  {values.categories?.map((item, idx) => (
                    <Badge key={idx} variant='green' className='flex items-center gap-2'>
                      <span>{item.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='flex flex-row justify-center p-4'>
                <Button
                  className='w-[163px] h-[46px] mr-4'
                  type='submit'
                  variant={'btnGreen'}
                  disabled={Articles.isPending || EditArticles.isPending}
                >
                  {post?.id === undefined ? (
                    Articles.isPending ? (
                      <Spinner />
                    ) : (
                      'Guardar'
                    )
                  ) : EditArticles.isPending ? (
                    <Spinner />
                  ) : (
                    'Editar'
                  )}
                </Button>
                {modalCheckOpen && (
                  <DialogClose>
                    <AlertCheck
                      title={`¡${alert}!`}
                      onClose={() => {
                        setModalCheckOpen(false);
                        Recargar();
                      }}
                    />
                  </DialogClose>
                )}
                <DialogClose asChild>
                  <Button className='w-[163px] h-[46px]' type='button' variant={'btnGray'}>
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
