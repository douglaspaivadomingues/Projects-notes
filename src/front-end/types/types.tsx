export type userType = {
  userName: string;
  password: string;
}

export type dataType = {
  id: number;
  userName: string;
  password: string;
};

export type logsType = {
  id: number,
  date: string;
  note: string;
  id_user: number;
};
