import router from "@/app/router";
import type { MoviesterGenre } from "@/shared/api/moviester/dto/genres.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { deepClone } from "@/shared/utils/general.utils";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import { useMoviesterGenresListStore } from "../../list/model/genres.store";
import type { MoviesterGenreEditState } from "../types/general.types";

export const useMoviesterGenreEditStore = defineStore("entity-moviester-genre-edit-store", {
  state: (): MoviesterGenreEditState => ({
    genre: null,
    genreCopy: null,
    isUpdated: false,
    isDeleted: false,
  }),

  getters: {
    isChange(state) {
      return JSON.stringify(state.genre) !== JSON.stringify(state.genreCopy);
    },

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
    init(genreId: number) {
      const moviesterGenresListStore = useMoviesterGenresListStore();
      const genre = moviesterGenresListStore.genres.find((el) => el.id == genreId);

      if (genre) {
        this.genre = genre;
        this.genreCopy = <MoviesterGenre>deepClone(genre);
      } else {
        console.debug("Genre not found");
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.LIST });
      }
    },

    async update() {
      this.isUpdated = true;

      if (!this.genre) {
        console.debug("genre not found");
        return;
      }

      try {
        await moviesterApi.genres.update(this.genre);
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isUpdated = false;
    },

    async delete() {
      this.isDeleted = true;

      if (!this.genre) {
        console.debug("genre not found");
        return;
      }

      try {
        await moviesterApi.genres.delete(this.genre.id);
        usePageModalsStore().close(PMN.GENRES.DELETE);

        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isDeleted = false;
    },
  },
});
