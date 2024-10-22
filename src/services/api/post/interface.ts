import { Articles, getLista } from '../interface';

export type postArticlesProps = {
  title: string;
  description: string;
  photo: {
    id: string;
  };
};

export abstract class Post {
  abstract getArticles: (token: string) => Promise<getLista<Articles>>;
  abstract postArticles: ({ title, description, photo: { id } }: postArticlesProps) => Promise<Articles>;
}
