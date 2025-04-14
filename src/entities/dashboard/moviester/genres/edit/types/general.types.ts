import type { MoviesterGenre } from "@/shared/api/moviester/dto/genres.dto";

export interface MoviesterGenreEditState {
  genre: MoviesterGenre | null;
  genreCopy: MoviesterGenre | null;
  isUpdated: boolean;
  isDeleted: boolean;
}
