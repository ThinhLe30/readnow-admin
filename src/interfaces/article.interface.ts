export interface IArticle {
  id?: string;
  author: string;
  title: string;
  description: string;
  content: string;
  imageURL: string;
  publishedAt: string;
  category?: IArticleCategory;
}
export interface ICreateArticleRequest extends FormData {}
export interface IArticleCategory {
  id: string;
  name: string;
}
export interface IListArticleRespone {
  data: {
    articles: IArticle[];
  };
  message: string;
  status: string;
}

export interface IArticleResponse {
  message: string;
  status: string;
}
