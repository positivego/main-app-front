import type { MoviesterEntityName } from "./general.dto";

export interface MoviesterActor {
  id: number;
  name: MoviesterEntityName;
  slug: string;
  images: File[];
}

export interface MoviesterActorCreateDto {
  data: {
    name: MoviesterEntityName;
  };
  images: File[];
}

export interface ActorsQueryParams {
  page: number;
  limit: number;
}

export interface ActorsPaginationData {
  actors: MoviesterActor[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
