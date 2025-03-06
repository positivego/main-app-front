import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import type { BreadcrambsState } from "../types/general.types";

export const useBreadcrumbsStore = defineStore("widget-breadcrumbs-store", {
  state: (): BreadcrambsState => ({}),

  getters: {
    breadcrumbs: () => {
      const route = useRoute();
      const matchedRoutes = route?.matched;
      return matchedRoutes?.map((el) => ({
        title: el.meta.title || el.name,
        path: el.path !== "/" ? el.path : null,
      }));
    },
  },

  actions: {},
});
