import { API } from "../instances";
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
};
