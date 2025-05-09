import type { DirectorsQueryParams } from "@/shared/api/moviester/dto/directors.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { defineStore } from "pinia";
import type { MoviesterDirectorsListState } from "../types/general.types";

export const useMoviesterDirectorsListStore = defineStore("entity-moviester-directors-list-store", {
  state: (): MoviesterDirectorsListState => ({
    directors: [],
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
        const params: DirectorsQueryParams = { page: this.pagination.page, limit: this.pagination.limit };

        const directorsData = await moviesterApi.directors.get(params);

        this.directors = directorsData.directors;
        this.pagination.count = directorsData.count;
        this.pagination.pageCount = directorsData.pageCount;
        this.pagination.totalCount = directorsData.totalCount;
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
