import type { CountriesQueryParams } from "@/shared/api/moviester/dto/countries.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { defineStore } from "pinia";
import type { MoviesterCountriesListState } from "../types/general.types";

export const useMoviesterCountriesListStore = defineStore("entity-moviester-countries-list-store", {
  state: (): MoviesterCountriesListState => ({
    countries: [],
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
        const params: CountriesQueryParams = { page: this.pagination.page, limit: this.pagination.limit };

        const countriesData = await moviesterApi.countries.get(params);

        this.countries = countriesData.countries;
        this.pagination.count = countriesData.count;
        this.pagination.pageCount = countriesData.pageCount;
        this.pagination.totalCount = countriesData.totalCount;
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
