import type { MoviesterCountry } from "@/shared/api/moviester/dto/countries.dto";

export interface MoviesterCountryEditState {
  country: MoviesterCountry | null;
  countryCopy: MoviesterCountry | null;
  isUpdated: boolean;
  isDeleted: boolean;
}
