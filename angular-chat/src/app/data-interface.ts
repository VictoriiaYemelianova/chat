export interface IServerModel {
  success: boolean;
  items: Array<IUserToken | IMessage>;
  message: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: string;
  email: string;
  login: string;
  password: string;
}

export interface IMessage {
  id?: string;
  message: string;
  idUser: number;
  createdAt: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}
