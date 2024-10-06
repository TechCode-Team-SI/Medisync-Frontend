import { getLista, Packages } from '../interface';

export type postPackageProps = {
  slugs: string[];
};

export abstract class packageInterface {
  abstract post: (slugs: postPackageProps) => Promise<Packages>;
  abstract get: (token: string) => Promise<getLista<Packages>>;
}
