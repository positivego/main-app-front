import { moviesterApi } from "@/shared/api/moviester";
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
        genresIds: [],
        actorsIds: [],
        releseDate: "",
        releseYaer: null,
        countryId: null,
        directorId: null,
        timeCount: null,
        typeId: null,
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
  },

  actions: {
    async loadData() {
      this.isDataLoading = true;

      try {
        const data = await moviesterApi.movies.getData();
        console.log({ data });
        this.data = data;
      } catch (error) {
        console.debug(error);
      }

      this.isDataLoading = false;
    },

    async append() {
      this.isLoading = true;
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
      this.movie.data.releseYaer = null;
      this.movie.data.countryId = null;
      this.movie.data.directorId = null;
      this.movie.data.timeCount = null;
      this.movie.data.typeId = null;
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
