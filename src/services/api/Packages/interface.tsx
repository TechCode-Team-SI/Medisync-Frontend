import { getLista, Packages } from '../interface';

export type postPackageProps = {
  slugs: string[];
};

export abstract class packageInterface {
  abstract postInstallation: (slugs: postPackageProps) => Promise<Packages>;
  abstract post: (slugs: postPackageProps) => Promise<Packages>;
  abstract getInstallation: (token: string) => Promise<getLista<Packages>>;
  abstract get: (token: string) => Promise<getLista<Packages>>;
}
