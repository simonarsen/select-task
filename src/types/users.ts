export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
};

export type UsersResponse = {
  data: User[];
  meta: {
    from: number;
  };
};
