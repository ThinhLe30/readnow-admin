export interface ICategory {
  name: string;
  id: number;
}
export interface ICategoryResponse {
  data: {
    categories: ICategory[];
  };
  message: string;
  status: string;
}

export interface ICategoryCUResponse {
  message: string;
  status: string;
}

export interface ICreateCategoryRequest {
  name: string;
}

export interface IUpdateCategoryRequest {
  name: string;
  id: string;
}
