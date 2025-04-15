import type { MoviesterEntityName } from "./general.dto";

export interface MoviesterCountry {
  id: number;
  name: MoviesterEntityName;
}

export interface CountriesQueryParams {
  page: number;
  limit: number;
}

export interface CountriesPaginationData {
  countries: MoviesterCountry[];
  count: number;
  totalCount: number;
  page: number;
  pageCount: number;
}
