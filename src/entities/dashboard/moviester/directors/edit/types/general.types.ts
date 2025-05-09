import type { MoviesterDirector } from "@/shared/api/moviester/dto/directors.dto";

export interface MoviesterDirectorEditState {
  director: MoviesterDirector | null;
  directorCopy: MoviesterDirector | null;
  isUpdated: boolean;
  isDeleted: boolean;
}
