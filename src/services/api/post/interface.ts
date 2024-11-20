import { Articles, getLista } from '../interface';

export type postArticlesProps = {
  title: string;
  description: string;
  categories?: string[];
  photo?: {
    id: string;
  };
};
export type ArticlesProps = {
  id: string;
  title: string;
  description: string;
  categories?: string[];
  photo?: {
    id: string;
  };
};

export abstract class Post {
  abstract getArticles: () => Promise<getLista<Articles>>;
  abstract getArticlesById: (id: string) => Promise<Articles>;
  abstract deleteArticlesById: ({ id, title, description, photo }: ArticlesProps) => Promise<Articles>;
  abstract postArticles: ({ title, description, photo }: postArticlesProps) => Promise<Articles>;
  abstract patchArticles: ({ id, title, description, photo }: ArticlesProps) => Promise<Articles>;
}
