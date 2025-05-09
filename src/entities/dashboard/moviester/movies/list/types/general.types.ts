import type { MoviesterMovieCreateDto, MoviesterMovieData } from "@/shared/api/moviester";

export interface MoviesterMovieState {
  movie: MoviesterMovieCreateDto;
  data: MoviesterMovieData;
  isDataLoading: boolean;
  isLoading: boolean;
}
