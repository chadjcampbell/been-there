export interface IUser {
  id: number;
  name: string;
  email: string;
  photo: string;
  bio: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
