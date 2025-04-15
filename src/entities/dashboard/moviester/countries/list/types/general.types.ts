import type { MoviesterCountry } from "@/shared/api/moviester/dto/countries.dto";

export interface MoviesterCountryState {
  country: MoviesterCountry;
  isLoading: boolean;
}

export interface MoviesterCountriesListState {
  countries: MoviesterCountry[];
  pagination: {
    count: number;
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
  isLoading: boolean;
}
