export interface IUser {
  id: number;
  email: string;
  name: string;
  photo: string;
  role: string;
}

export interface IUserResponse {
  data: {
    users: IUser[];
  };
  message: string;
  status: string;
}

export interface IUserCUResponse {
  message: string;
  status: string;
}

export interface IUserRequest extends FormData {}
