import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { defineStore } from "pinia";
import type { MoviesterGenreState } from "../types/general.types";
import { useMoviesterGenresListStore } from "./genres.store";

export const useMoviesterGenreStore = defineStore("entity-moviester-genret-store", {
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
        const newGenre = await moviesterApi.genres.create(this.genre.name);

        console.log({ newGenre });

        const genresStore = useMoviesterGenresListStore();
        genresStore.get();
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
