import router from "@/app/router";
import type { MoviesterMovieType } from "@/shared/api/moviester/dto/movie-type.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { deepClone } from "@/shared/utils/general.utils";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import { useMoviesterMovieTypesListStore } from "../../list/model/movie-types.store";
import type { MoviesterMovieTypeEditState } from "../types/general.types";

export const useMoviesterMovieTypeEditStore = defineStore("entity-moviester-movie-type-edit-store", {
  state: (): MoviesterMovieTypeEditState => ({
    type: null,
    typeCopy: null,
    isUpdated: false,
    isDeleted: false,
  }),

  getters: {
    isChange(state) {
      return JSON.stringify(state.type) !== JSON.stringify(state.typeCopy);
    },

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
    init(genreId: number) {
      const moviesterMovieTypesListStore = useMoviesterMovieTypesListStore();
      const genre = moviesterMovieTypesListStore.types.find((el) => el.id == genreId);

      if (genre) {
        this.type = genre;
        this.typeCopy = <MoviesterMovieType>deepClone(genre);
      } else {
        console.debug("movie type not found");
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.LIST });
      }
    },

    async update() {
      this.isUpdated = true;

      if (!this.type) {
        console.debug("movie type not found");
        return;
      }

      try {
        await moviesterApi.movieTypes.update(this.type);
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isUpdated = false;
    },

    async delete() {
      this.isDeleted = true;

      if (!this.type) {
        console.debug("movie type not found");
        return;
      }

      try {
        await moviesterApi.movieTypes.delete(this.type.id);
        usePageModalsStore().close(PMN.MOVIE_TYPES.DELETE);

        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isDeleted = false;
    },
  },
});
