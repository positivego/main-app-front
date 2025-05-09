import router from "@/app/router";
import type { MoviesterActor } from "@/shared/api/moviester/dto/actors.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { deepClone } from "@/shared/utils/general.utils";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import { useMoviesterActorsListStore } from "../../list/model/actors.store";
import type { MoviesterActorEditState } from "../types/general.types";

export const useMoviesterActorEditStore = defineStore("entity-moviester-actor-edit-store", {
  state: (): MoviesterActorEditState => ({
    actor: null,
    actorCopy: null,
    isUpdated: false,
    isDeleted: false,
  }),

  getters: {
    isChange(state) {
      return JSON.stringify(state.actor) !== JSON.stringify(state.actorCopy);
    },

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
    init(actorId: number) {
      const moviesterCountriesListStore = useMoviesterActorsListStore();
      const actor = moviesterCountriesListStore.actors.find((el) => el.id == actorId);

      if (actor) {
        this.actor = actor;
        this.actorCopy = <MoviesterActor>deepClone(actor);
      } else {
        console.debug("actor not found");
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.ACTORS.LIST });
      }
    },

    changeImages(images: (File | string)[]) {
      if (this.actor) {
        this.actor.images = images;
      }
    },

    async update() {
      this.isUpdated = true;

      if (!this.actor) {
        console.debug("actor not found");
        return;
      }

      try {
        await moviesterApi.actors.update(this.actor);
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.ACTORS.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isUpdated = false;
    },

    async delete() {
      this.isDeleted = true;

      if (!this.actor) {
        console.debug("actor not found");
        return;
      }

      try {
        await moviesterApi.actors.delete(this.actor.id);
        usePageModalsStore().close(PMN.ACTORS.DELETE);

        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.ACTORS.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isDeleted = false;
    },
  },
});
