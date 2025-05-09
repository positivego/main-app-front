import type { MoviesterEntityName } from "./general.dto";

export interface MoviesterDirector {
  id: number;
  name: MoviesterEntityName;
  slug: string;
  images: (File | string)[];
}

export interface MoviesterDirectorCreateDto {
  data: {
    name: MoviesterEntityName;
  };
  images: (File | string)[];
}

export interface DirectorsQueryParams {
  page: number;
  limit: number;
}

export interface DirectorsPaginationData {
  directors: MoviesterDirector[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
