import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import type { MoviesterDirectorState } from "../types/general.types";
import { useMoviesterDirectorsListStore } from "./directors.store";

export const useMoviesterDirectorStore = defineStore("entity-moviester-director-store", {
  state: (): MoviesterDirectorState => ({
    director: {
      data: {
        name: {
          ru: "",
          en: "",
        },
      },
      images: [],
    },
    isLoading: false,
  }),

  getters: {
    currentNames(state): boolean {
      if (!state?.director?.data.name?.ru?.length) return false;
      if (!state?.director?.data.name?.en?.length) return false;
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
        await moviesterApi.directors.create(this.director);

        usePageModalsStore().close(PMN.DIRECTORS.APPEND);
        this.reset();

        useMoviesterDirectorsListStore().get();
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    changeImages(images: (File | string)[]) {
      this.director.images = images;
    },

    reset() {
      this.director.data.name.ru = "";
      this.director.data.name.en = "";
      this.director.images = [];
    },
  },
});
