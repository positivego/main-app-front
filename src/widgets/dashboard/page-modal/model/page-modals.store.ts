import { defineStore } from "pinia";
import type { PageModalsState } from "../types";

export const usePageModalsStore = defineStore("widget-page-modals-store", {
  state: (): PageModalsState => ({
    inited: [],
  }),

  getters: {
    isOpen: (state) => {
      return (modalName: string) => {
        return state.inited.includes(modalName);
      };
    },
  },

  actions: {
    init(modalName: string) {
      if (this.isOpen(modalName)) {
        console.debug("is modal inited");
        return;
      }

      this.inited.push(modalName);
    },

    close(modalName: string) {
      if (!this.isOpen(modalName)) {
        console.debug("is modal not inited");
        return;
      }

      this.inited = this.inited.filter((el: string) => el !== modalName);
    },
  },
});
