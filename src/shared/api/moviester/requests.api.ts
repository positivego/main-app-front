import { getFormDataByObj } from "@/shared/utils/general.utils";
import { API } from "../instances";
import type { ActorsPaginationData, ActorsQueryParams, MoviesterActor } from "./dto/actors.dto";
import type { CountriesPaginationData, CountriesQueryParams, MoviesterCountry } from "./dto/countries.dto";
import type { MoviesterEntityName } from "./dto/general.dto";
import type { GenresPaginationData, GenresQueryParams, MoviesterGenre } from "./dto/genres.dto";
import type { MoviesterMovieType, MovieTypesPaginationData, MovieTypesQueryParams } from "./dto/movie-type.dto";

export const moviesterApi = {
  movieTypes: {
    get: async (params: MovieTypesQueryParams): Promise<MovieTypesPaginationData> => {
      return API.get("/moviester/movie-types", { params }).then((res) => res?.data);
    },

    create: async (data: MoviesterEntityName): Promise<MoviesterMovieType> => {
      return API.post("/moviester/movie-types", data).then((res) => res?.data);
    },

    update: async (data: MoviesterMovieType): Promise<MoviesterMovieType> => {
      return API.patch("/moviester/movie-types", data).then((res) => res?.data);
    },

    delete: async (id: number): Promise<number> => {
      return API.delete(`/moviester/movie-types/${id}`).then((res) => res?.data);
    },
  },

  genres: {
    get: async (params: GenresQueryParams): Promise<GenresPaginationData> => {
      return API.get("/moviester/genres", { params }).then((res) => res?.data);
    },

    create: async (data: MoviesterEntityName): Promise<MoviesterGenre> => {
      return API.post("/moviester/genres", data).then((res) => res?.data);
    },

    update: async (data: MoviesterGenre): Promise<MoviesterGenre> => {
      return API.patch("/moviester/genres", data).then((res) => res?.data);
    },

    delete: async (id: number): Promise<number> => {
      return API.delete(`/moviester/genres/${id}`).then((res) => res?.data);
    },
  },

  countries: {
    get: async (params: CountriesQueryParams): Promise<CountriesPaginationData> => {
      return API.get("/moviester/countries", { params }).then((res) => res?.data);
    },

    create: async (data: MoviesterEntityName): Promise<MoviesterCountry> => {
      return API.post("/moviester/countries", data).then((res) => res?.data);
    },

    update: async (data: MoviesterCountry): Promise<MoviesterCountry> => {
      return API.patch("/moviester/countries", data).then((res) => res?.data);
    },

    delete: async (id: number): Promise<number> => {
      return API.delete(`/moviester/countries/${id}`).then((res) => res?.data);
    },
  },

  actors: {
    get: async (params: ActorsQueryParams): Promise<ActorsPaginationData> => {
      return API.get("/moviester/actors", { params }).then((res) => res?.data);
    },

    create: async (data: MoviesterActor): Promise<MoviesterActor> => {
      const actorData = getFormDataByObj(data);
      return API.post("/moviester/actors", actorData, { headers: { "Content-Type": "multipart/formdata" } }).then(
        (res) => res?.data
      );
    },
  },
};
