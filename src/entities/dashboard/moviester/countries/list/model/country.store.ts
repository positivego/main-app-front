import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import type { MoviesterCountryState } from "../types/general.types";
import { useMoviesterCountriesListStore } from "./countries.store";

export const useMoviesterCountryStore = defineStore("entity-moviester-country-store", {
  state: (): MoviesterCountryState => ({
    country: {
      id: 0,
      name: {
        ru: "",
        en: "",
      },
    },
    isLoading: false,
  }),

  getters: {
    currentNames(state): boolean {
      if (!state?.country?.name?.ru?.length) return false;
      if (!state?.country?.name?.en?.length) return false;
      return true;
    },

    currentValus(): boolean {
      if (!this.currentNames) return false;
      return true;
    },
  },

  actions: {
    async append() {
      this.isLoading = true;

      try {
        await moviesterApi.countries.create(this.country.name);

        usePageModalsStore().close(PMN.COUNTRIES.APPEND);
        this.reset();

        useMoviesterCountriesListStore().get();
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    reset() {
      this.country.id = 0;
      this.country.name.ru = "";
      this.country.name.en = "";
    },
  },
});
