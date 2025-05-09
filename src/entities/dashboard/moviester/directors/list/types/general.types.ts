import type { MoviesterDirector, MoviesterDirectorCreateDto } from "@/shared/api/moviester/dto/directors.dto";

export interface MoviesterDirectorState {
  director: MoviesterDirectorCreateDto;
  isLoading: boolean;
}

export interface MoviesterDirectorsListState {
  directors: MoviesterDirector[];
  pagination: {
    count: number;
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
  isLoading: boolean;
}
