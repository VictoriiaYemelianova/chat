export interface IServerModel {
  success: boolean;
  items: Array<IUserToken | IMessage | IRoom | IUser | IUserRoom>;
  message: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: number;
  email: string;
  login: string;
  password: string;
  role: string;
}

export interface IMessage {
  id?: string;
  message: string;
  userLogin: string;
  idUser: number;
  path?: string;
  createAt: string;
  updateAt: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUserOnline {
  users: Array<string>;
}

export interface IUserData {
  userName: string;
  room: string;
}

export interface IUserRoom {
  roomId?: number;
  roomName: string;
  creator?: number;
}

export interface IRoom {
  id: number;
  idRoom: number;
  participator: number;
}

export interface IChatModel {
  roomName: string;
  creatorId: number;
  participator?: Array<number>;
}
