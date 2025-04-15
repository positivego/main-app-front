import router from "@/app/router";
import type { MoviesterCountry } from "@/shared/api/moviester/dto/countries.dto";
import { moviesterApi } from "@/shared/api/moviester/requests.api";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { deepClone } from "@/shared/utils/general.utils";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";
import { defineStore } from "pinia";
import { useMoviesterCountriesListStore } from "../../list/model/countries.store";
import type { MoviesterCountryEditState } from "../types/general.types";

export const useMoviesterCountryEditStore = defineStore("entity-moviester-country-edit-store", {
  state: (): MoviesterCountryEditState => ({
    country: null,
    countryCopy: null,
    isUpdated: false,
    isDeleted: false,
  }),

  getters: {
    isChange(state) {
      return JSON.stringify(state.country) !== JSON.stringify(state.countryCopy);
    },

    currentNames(state): boolean {
      if (!state?.country?.name?.ru?.length) return false;
      if (!state?.country?.name?.en?.length) return false;
      return true;
    },

    currentValus(): boolean {
      if (!this.currentNames) return false;
      return true;
    },
  },

  actions: {
    init(countryId: number) {
      const moviesterCountriesListStore = useMoviesterCountriesListStore();
      const country = moviesterCountriesListStore.countries.find((el) => el.id == countryId);

      if (country) {
        this.country = country;
        this.countryCopy = <MoviesterCountry>deepClone(country);
      } else {
        console.debug("country not found");
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.LIST });
      }
    },

    async update() {
      this.isUpdated = true;

      if (!this.country) {
        console.debug("country not found");
        return;
      }

      try {
        await moviesterApi.countries.update(this.country);
        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isUpdated = false;
    },

    async delete() {
      this.isDeleted = true;

      if (!this.country) {
        console.debug("country not found");
        return;
      }

      try {
        await moviesterApi.countries.delete(this.country.id);
        usePageModalsStore().close(PMN.COUNTRIES.DELETE);

        router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.LIST });
      } catch (error) {
        console.debug(error);
      }

      this.isDeleted = false;
    },
  },
});
