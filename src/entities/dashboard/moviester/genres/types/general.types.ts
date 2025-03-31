import type { MoviesterGenre } from "@/shared/api/moviester/dto/genres.dto";

export interface MoviesterGenreState {
  genre: MoviesterGenre;
  isLoading: boolean;
}

export interface MoviesterGenresListState {
  genres: MoviesterGenre[];
  pagination: {
    count: number;
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
  isLoading: boolean;
}
