import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import type { MoviesterMovieTypeState } from "../types/general.types";
import { useMoviesterMovieTypesListStore } from "./movie-types.store";

export const useMoviesteMovieTypeStore = defineStore("entity-moviester-movie-type-store", {
  state: (): MoviesterMovieTypeState => ({
    type: {
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
      if (!state?.type?.name?.ru?.length) return false;
      if (!state?.type?.name?.en?.length) return false;
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
        await moviesterApi.movieTypes.create(this.type.name);

        usePageModalsStore().close(PMN.MOVIE_TYPES.APPEND);
        this.reset();

        useMoviesterMovieTypesListStore().get();
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    reset() {
      this.type.id = 0;
      this.type.name.ru = "";
      this.type.name.en = "";
    },
  },
});
