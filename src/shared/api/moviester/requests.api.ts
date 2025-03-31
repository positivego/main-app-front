import { API } from "../instances";
import type { MoviesterEntityName } from "./dto/general.dto";
import type { GenresPaginationData, GenresQueryParams, MoviesterGenre } from "./dto/genres.dto";

export const moviesterApi = {
  genres: {
    get: async (params: GenresQueryParams): Promise<GenresPaginationData> => {
      return API.get("/moviester/genres", { params }).then((res) => res?.data);
    },

    create: async (data: MoviesterEntityName): Promise<MoviesterGenre> => {
      return API.post("/moviester/genres", data).then((res) => res?.data);
    },
  },
};
