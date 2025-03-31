import type { GenresQueryParams } from "@/shared/api/moviester/dto/genres.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { defineStore } from "pinia";
import type { MoviesterGenresListState } from "../types/general.types";

export const useMoviesterGenresListStore = defineStore("entity-moviester-genres-list-store", {
  state: (): MoviesterGenresListState => ({
    genres: [],
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
        const params: GenresQueryParams = { page: this.pagination.page, limit: this.pagination.limit };

        const genresData = await moviesterApi.genres.get(params);

        this.genres = genresData.genres;
        this.pagination.count = genresData.count;
        this.pagination.pageCount = genresData.pageCount;
        this.pagination.totalCount = genresData.totalCount;
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
