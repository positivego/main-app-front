import type { Account, AccountPermissions } from "@/shared/api/main";

export interface AccountsListState {
  accounts: Account[];
  pagination: {
    count: number;
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
  search: string;
  isLoading: boolean;
}

export interface MappedAccount {
  id: number;
  email: string;
  username: string;
  roleId: number;
  isBanned: boolean;
  permissions: AccountPermissions;
  createdAt?: string;
}
