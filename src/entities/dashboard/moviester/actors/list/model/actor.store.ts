import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import type { MoviesterActorState } from "../types/general.types";
import { useMoviesterActorsListStore } from "./actors.store";

export const useMoviesterActorStore = defineStore("entity-moviester-actor-store", {
  state: (): MoviesterActorState => ({
    actor: {
      id: 0,
      name: {
        ru: "",
        en: "",
      },
      slug: "",
      images: [],
    },
    isLoading: false,
  }),

  getters: {
    currentNames(state): boolean {
      if (!state?.actor?.name?.ru?.length) return false;
      if (!state?.actor?.name?.en?.length) return false;
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

    reset() {
      this.actor.id = 0;
      this.actor.name.ru = "";
      this.actor.name.en = "";
      this.actor.slug = "";
      this.actor.images = [];
    },
  },
});
