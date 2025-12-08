import type { MoviesterActor } from "./actors.dto";
import type { MoviesterCountry } from "./countries.dto";
import type { MoviesterDirector } from "./directors.dto";
import type { MoviesterEntityName } from "./general.dto";
import type { MoviesterGenre } from "./genres.dto";
import type { MoviesterMovieType } from "./movie-type.dto";

export interface MoviesterMovieImages {
  poster: (File | string)[];
  images: (File | string)[];
}

export interface MoviesterMovie {
  id?: number;
  name: MoviesterEntityName;
  slug: string;
  description: string;
  releseDate: string;
  releseYaer: number;
  countryId: number;
  directorId: number;
  timeCount: number;
  typeId: number;
  images: MoviesterMovieImages;
  createdAt?: string;
  updatedAt?: string;
}

export interface MoviesterMovieCreateDto {
  data: {
    name: MoviesterEntityName;
    description: string;
    genresIds: number[];
    actorsIds: number[];
    releseDate: string;
    releseYaer: string;
    countryId: number | undefined;
    directorId: number | undefined;
    timeCount: string;
    typeId: number | undefined;
  };
  images: {
    poster: (File | string)[];
    images: (File | string)[];
  };
}

export interface MoviesterMovieData {
  genres: MoviesterGenre[];
  types: MoviesterMovieType[];
  countries: MoviesterCountry[];
  actors: MoviesterActor[];
  directors: MoviesterDirector[];
}
