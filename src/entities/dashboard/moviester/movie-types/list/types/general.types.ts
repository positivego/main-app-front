import type { MoviesterMovieType } from "@/shared/api/moviester/dto/movie-type.dto";

export interface MoviesterMovieTypeState {
  type: MoviesterMovieType;
  isLoading: boolean;
}

export interface MoviesterMovieTypesListState {
  types: MoviesterMovieType[];
  pagination: {
    count: number;
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
  isLoading: boolean;
}
