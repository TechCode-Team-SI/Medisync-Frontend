import { ArticleCategory, getLista, WithPagination } from '../interface';

export type postArticleCategoryprops = {
  name: string;
};
export type pachtArticleCategoryprops = {
  id: string;
  name: string;
};

export interface getArticleCategoryProps extends WithPagination {
  search?: string;
}

export abstract class modelArticleCategory {
  abstract getArticleCategory: (props?: getArticleCategoryProps) => Promise<getLista<ArticleCategory>>;
  abstract postArticleCategory: ({ name }: postArticleCategoryprops) => Promise<ArticleCategory>;
  abstract patchArticleCategory: ({ id, name }: pachtArticleCategoryprops) => Promise<ArticleCategory>;
  abstract deleteArticleCategory: ({ id, name }: pachtArticleCategoryprops) => Promise<ArticleCategory>;
}
