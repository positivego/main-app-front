import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import type { MoviesterActorState } from "../types/general.types";
import { useMoviesterActorsListStore } from "./actors.store";

export const useMoviesterActorStore = defineStore("entity-moviester-actor-store", {
  state: (): MoviesterActorState => ({
    actor: {
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
      if (!state?.actor?.data.name?.ru?.length) return false;
      if (!state?.actor?.data.name?.en?.length) return false;
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
        await moviesterApi.actors.create(this.actor);

        usePageModalsStore().close(PMN.ACTORS.APPEND);
        this.reset();

        useMoviesterActorsListStore().get();
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    changeImages(images: File[]) {
      this.actor.images = images;
    },

    reset() {
      this.actor.data.name.ru = "";
      this.actor.data.name.en = "";
      this.actor.images = [];
    },
  },
});
