import type { MoviesterActor } from "./actors.dto";
import type { MoviesterCountry } from "./countries.dto";
import type { MoviesterDirector } from "./directors.dto";
import type { MoviesterEntityName } from "./general.dto";
import type { MoviesterGenre } from "./genres.dto";
import type { MoviesterMovieType } from "./movie-type.dto";

export interface MoviesterMovieImages {
  poster: File | string;
  images: (File | string)[];
}

export interface MoviesterMovie {
  id?: number;
  name: MoviesterEntityName;
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
    genresIds: number[];
    actorsIds: number[];
    releseDate: string;
    releseYaer: number | null;
    countryId: number | null;
    directorId: number | null;
    timeCount: number | null;
    typeId: number | null;
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
