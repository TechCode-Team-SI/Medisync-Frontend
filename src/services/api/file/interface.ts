import { Image } from '../interface';

export type fileProps = {
  fileLoad: File;
};

export abstract class FileUpload {
  abstract postFile: ({ fileLoad }: fileProps) => Promise<Image>;
}
