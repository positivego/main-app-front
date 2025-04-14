import type { MoviesterMovieType } from "@/shared/api/moviester/dto/movie-type.dto";

export interface MoviesterMovieTypeEditState {
  type: MoviesterMovieType | null;
  typeCopy: MoviesterMovieType | null;
  isUpdated: boolean;
  isDeleted: boolean;
}
