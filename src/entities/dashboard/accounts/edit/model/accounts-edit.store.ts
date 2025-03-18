import router from "@/app/router";
import { mainApi, type Account } from "@/shared/api/main";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { deepClone } from "@/shared/utils/general.utils";
import { defineStore } from "pinia";
import { useAccountsListStore } from "../../list/model";
import type { AccountsEditState } from "../types";

export const useAccountsEditStore = defineStore("entity-accounts-edit-store", {
  state: (): AccountsEditState => ({
    account: null,
    accountCopy: null,
    isUpdated: false,
  }),

  getters: {
    isAccountChange(state): boolean {
      return JSON.stringify(state.account) !== JSON.stringify(state.accountCopy);
    },
  },

  actions: {
    init(accountId: number) {
      const accountsListStore = useAccountsListStore();
      const account = accountsListStore?.accounts?.find((el) => el.id === accountId);

      if (account) {
        this.account = account;
        this.accountCopy = <Account>deepClone(account);
      } else {
        console.debug("Account not found");
        router.push({ name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.LIST });
      }
    },

    async update() {
      if (!this.account || !this.accountCopy) return;
      this.isUpdated = true;

      try {
        const updatedData = await mainApi.accounts.update(this.accountCopy);
        this.account.permissions = updatedData.permissions;
      } catch (error) {
        console.debug(error);
      }

      this.isUpdated = false;
    },
  },
});
