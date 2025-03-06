export interface AccountPermissions {
  users: {
    edit: boolean;
    delete: boolean;
    banned: boolean;
    muted: boolean;
  };
  moviester: {
    movies: {
      apped: boolean;
      edit: boolean;
      delete: boolean;
    };
    comments: {
      edit: boolean;
      delete: boolean;
    };
  };
}

export interface Account {
  id: number;
  email: string;
  username: string;
  password: string;
  roleId: number;
  isBanned: boolean;
  permissions: AccountPermissions;
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AccountsQueryParams {
  search?: string;
  page: number;
  limit: number;
}

export interface AccountsPaginationData {
  accounts: Account[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
