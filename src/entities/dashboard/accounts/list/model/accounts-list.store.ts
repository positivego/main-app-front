import { mainApi, type AccountsQueryParams } from "@/shared/api/main";
import { defineStore } from "pinia";
import type { AccountsListState, MappedAccount } from "../types";

export const useAccountsListStore = defineStore("entity-users-list-store", {
  state: (): AccountsListState => ({
    accounts: [],
    pagination: {
      count: 0,
      page: 1,
      limit: 10,
      pageCount: 0,
      totalCount: 0,
    },
    search: "",
    isLoading: true,
  }),

  getters: {
    mappedAccounts(): MappedAccount[] {
      return this.accounts.map((el) => {
        return {
          id: el.id,
          username: el.username,
          email: el.email,
          roleId: el.roleId,
          isBanned: el.isBanned,
          permissions: el.permissions,
          createdAt: el.createdAt,
        };
      });
    },
  },

  actions: {
    async get() {
      this.isLoading = true;

      try {
        const query: AccountsQueryParams = { page: this.pagination.page, limit: this.pagination.limit };
        if (this?.search?.length) query.search = this.search;
        const accountsData = await mainApi.accounts.get(query);

        this.accounts = accountsData.accounts;
        this.pagination.count = accountsData.count;
        this.pagination.pageCount = accountsData.pageCount;
        this.pagination.totalCount = accountsData.totalCount;
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },
  },
});
