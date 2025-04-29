import type { ActorsQueryParams } from "@/shared/api/moviester/dto/actors.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { defineStore } from "pinia";
import type { MoviesterActorsListState } from "../types/general.types";

export const useMoviesterActorsListStore = defineStore("entity-moviester-actors-list-store", {
  state: (): MoviesterActorsListState => ({
    actors: [],
    pagination: {
      count: 0,
      page: 1,
      limit: 10,
      pageCount: 0,
      totalCount: 0,
    },
    isLoading: true,
  }),

  getters: {},

  actions: {
    async get() {
      this.isLoading = true;

      try {
        const params: ActorsQueryParams = { page: this.pagination.page, limit: this.pagination.limit };

        const actorsData = await moviesterApi.actors.get(params);

        this.actors = actorsData.actors;
        this.pagination.count = actorsData.count;
        this.pagination.pageCount = actorsData.pageCount;
        this.pagination.totalCount = actorsData.totalCount;
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    onSelectPrevPage() {
      if (this.pagination.page <= 1 || this.isLoading) return;
      const page = this.pagination.page - 1;
      this.onSelectPage(page);
    },

    onSelectNextPage() {
      if (this.pagination.page >= this.pagination.pageCount || this.isLoading) return;
      const page = this.pagination.page + 1;
      this.onSelectPage(page);
    },

    onSelectPage(page: number) {
      if (this.pagination.page === page || this.isLoading) return;
      this.pagination.page = page;
      this.get();
    },

    onChangeLimit(limit: number) {
      if (this.pagination.limit === limit || this.isLoading) return;
      this.pagination.limit = limit;
      this.get();
    },
  },
});
