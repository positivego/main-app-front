import { mainApi } from "@/shared/api/main";
import { defineStore } from "pinia";
import type { AppState } from "../types";

export const useAppStore = defineStore("app-store", {
  state: (): AppState => ({
    account: null,
    roles: [],
    tokents: {
      accessToken: "",
      refreshToken: "",
    },
    isAppLoading: true,
  }),

  getters: {},

  actions: {
    async init() {
      this.isAppLoading = true;

      const { localAccessToken, localRefreshToken } = this.getLocalTokens();
      if (!localAccessToken?.length || !localRefreshToken?.length) {
        // То тут кидаем на страницу авторизации
      }

      try {
        const account = await mainApi.auth.refresh({ refreshToken: localRefreshToken! });
        this.account = account;

        const { accessToken, refreshToken } = account;
        this.tokents.accessToken = accessToken;
        this.tokents.refreshToken = refreshToken;
        this.setLocalTokens();

        await this.loadAppData();

        // То тут кидаем на страницу статистики
      } catch (error) {
        console.debug(error);
        // То тут кидаем на страницу авторизации
      }

      this.isAppLoading = false;
    },

    async loadAppData() {
      const roles = await mainApi.roles.get();
      this.roles = roles;
    },

    login() {},

    setLocalTokens() {
      localStorage.setItem("accessToken", this.tokents.accessToken);
      localStorage.setItem("refreshToken", this.tokents.refreshToken);
    },

    getLocalTokens() {
      return {
        localAccessToken: localStorage.getItem("accessToken") || null,
        localRefreshToken: localStorage.getItem("refreshToken") || null,
      };
    },
  },
});
