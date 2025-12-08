import { moviesterApi } from "@/shared/api/moviester";
import type { DropdownItem } from "@/shared/components/dropdown/ui.vue";
import { defineStore } from "pinia";
import type { MoviesterMovieState } from "../types/general.types";

export const useMoviesterMovieStore = defineStore("entity-moviester-movie-store", {
  state: (): MoviesterMovieState => ({
    movie: {
      data: {
        name: {
          ru: "",
          en: "",
        },
        description: "",
        genresIds: [],
        actorsIds: [],
        releseDate: "",
        releseYaer: "",
        countryId: undefined,
        directorId: undefined,
        timeCount: "",
        typeId: undefined,
      },
      images: {
        images: [],
        poster: [],
      },
    },
    data: {
      actors: [],
      countries: [],
      directors: [],
      genres: [],
      types: [],
    },
    isDataLoading: false,
    isLoading: false,
  }),

  getters: {
    currentNames(state): boolean {
      return true;
    },

    currentValus(): boolean {
      if (!this.currentNames) return false;
      return true;
    },

    types(state): DropdownItem[] {
      return state?.data?.types?.map((el) => {
        return {
          id: el.id,
          label: el.name.ru,
        };
      });
    },

    genres(state): DropdownItem[] {
      return state?.data?.genres?.map((el) => {
        return {
          id: el.id,
          label: el.name.ru,
        };
      });
    },

    countries(state): DropdownItem[] {
      return state?.data?.countries?.map((el) => {
        return {
          id: el.id,
          label: el.name.ru,
        };
      });
    },

    directors(state): DropdownItem[] {
      return state?.data?.directors?.map((el) => {
        return {
          id: el.id,
          label: el.name.ru,
        };
      });
    },

    actors(state): DropdownItem[] {
      return state?.data?.actors?.map((el) => {
        return {
          id: el.id,
          label: el.name.ru,
        };
      });
    },
  },

  actions: {
    async loadData() {
      this.isDataLoading = true;

      try {
        const data = await moviesterApi.movies.getData();
        this.data = data;
      } catch (error) {
        console.debug(error);
      }

      this.isDataLoading = false;
    },

    async append() {
      this.isLoading = true;

      try {
        console.log({ m: this.movie });
        await moviesterApi.movies.create(this.movie);

        // usePageModalsStore().close(PMN.MOVIES.APPEND);
        // this.reset();

        //useMoviesterGenresListStore().get();
      } catch (error) {
        console.debug(error);
      }

      this.isLoading = false;
    },

    changePoster(posters: (File | string)[]) {
      this.movie.images.poster = posters;
    },

    changeImages(images: (File | string)[]) {
      this.movie.images.images = images;
    },

    reset() {
      this.movie.data.name.ru = "";
      this.movie.data.name.en = "";
      this.movie.data.genresIds = [];
      this.movie.data.actorsIds = [];
      this.movie.data.releseDate = "";
      this.movie.data.releseYaer = "";
      this.movie.data.countryId = undefined;
      this.movie.data.directorId = undefined;
      this.movie.data.timeCount = "";
      this.movie.data.typeId = undefined;
      this.movie.images.images = [];
      this.movie.images.poster = [];

      this.data.actors = [];
      this.data.countries = [];
      this.data.genres = [];
      this.data.types = [];
      this.data.directors = [];
    },
  },
});
