import type { MoviesterActor } from "@/shared/api/moviester/dto/actors.dto";

export interface MoviesterActorState {
  actor: MoviesterActor;
  isLoading: boolean;
}

export interface MoviesterActorsListState {
  actors: MoviesterActor[];
  pagination: {
    count: number;
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
  isLoading: boolean;
}
