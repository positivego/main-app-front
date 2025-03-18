import { defineStore } from "pinia";
import type { BreadcrambsState } from "../types/general.types";

export const useBreadcrumbsStore = defineStore("widget-breadcrumbs-store", {
  state: (): BreadcrambsState => ({}),

  getters: {},

  actions: {},
});
