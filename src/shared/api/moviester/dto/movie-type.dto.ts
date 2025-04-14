import type { MoviesterEntityName } from "./general.dto";

export interface MoviesterMovieType {
  id: number;
  name: MoviesterEntityName;
}

export interface MovieTypesQueryParams {
  page: number;
  limit: number;
}

export interface MovieTypesPaginationData {
  types: MoviesterMovieType[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
