import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import type { MoviesterGenreState } from "../types/general.types";
import { useMoviesterGenresListStore } from "./genres.store";

export const useMoviesterGenreStore = defineStore("entity-moviester-genre-store", {
  state: (): MoviesterGenreState => ({
    genre: {
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
      if (!state?.genre?.name?.ru?.length) return false;
      if (!state?.genre?.name?.en?.length) return false;
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
        await moviesterApi.genres.create(this.genre.name);

        usePageModalsStore().close(PMN.GENRES.APPEND);
        this.reset();

        useMoviesterGenresListStore().get();
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    reset() {
      this.genre.id = 0;
      this.genre.name.ru = "";
      this.genre.name.en = "";
    },
  },
});
