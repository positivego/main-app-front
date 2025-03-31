import type { MoviesterEntityName } from "./general.dto";

export interface MoviesterGenre {
  id: number;
  name: MoviesterEntityName;
}

export interface GenresQueryParams {
  page: number;
  limit: number;
}

export interface GenresPaginationData {
  genres: MoviesterGenre[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
