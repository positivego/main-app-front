import { mainApi } from "@/shared/api/main";
import { useAppStore } from "@/shared/app";
import { defineStore } from "pinia";
import type { AccountsListState } from "../types";

export const useAccountsListStore = defineStore("entity-users-list-store", {
  state: (): AccountsListState => ({}),

  getters: {},

  actions: {
    async init() {
      const appStore = useAppStore();
      const accounts = await mainApi.accounts.get({ page: 1, limit: 50 });
    },
  },
});
