import router from "@/app/router";
import type { MoviesterDirector } from "@/shared/api/moviester/dto/directors.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { deepClone } from "@/shared/utils/general.utils";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import { useMoviesterDirectorsListStore } from "../../list/model/directors.store";
import type { MoviesterDirectorEditState } from "../types/general.types";

export const useMoviesterDirectorEditStore = defineStore("entity-moviester-director-edit-store", {
  state: (): MoviesterDirectorEditState => ({
    director: null,
    directorCopy: null,
    isUpdated: false,
    isDeleted: false,
  }),

  getters: {
    isChange(state) {
      return JSON.stringify(state.director) !== JSON.stringify(state.directorCopy);
    },

    currentNames(state): boolean {
      if (!state?.director?.name?.ru?.length) return false;
      if (!state?.director?.name?.en?.length) return false;
      return true;
    },

    currentValus(): boolean {
      if (!this.currentNames) return false;
      return true;
    },
  },

  actions: {
    init(actorId: number) {
      const moviesterDirectorsListStore = useMoviesterDirectorsListStore();
      const director = moviesterDirectorsListStore.directors.find((el) => el.id == actorId);

      if (director) {
        this.director = director;
        this.directorCopy = <MoviesterDirector>deepClone(director);
      } else {
        console.debug("director not found");
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.DIRECTORS.LIST });
      }
    },

    changeImages(images: (File | string)[]) {
      if (this.director) {
        this.director.images = images;
      }
    },

    async update() {
      this.isUpdated = true;

      if (!this.director) {
        console.debug("director not found");
        return;
      }

      try {
        await moviesterApi.directors.update(this.director);
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.DIRECTORS.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isUpdated = false;
    },

    async delete() {
      this.isDeleted = true;

      if (!this.director) {
        console.debug("director not found");
        return;
      }

      try {
        await moviesterApi.directors.delete(this.director.id);
        usePageModalsStore().close(PMN.DIRECTORS.DELETE);

        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.DIRECTORS.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isDeleted = false;
    },
  },
});
