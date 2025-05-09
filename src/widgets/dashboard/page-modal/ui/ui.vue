<script setup lang="ts">
import { PAGE_MODALS_NAMES as PMN } from "../constants";
import { usePageModalsStore } from "../model";
import { ActorsAppedModal } from "./modals/actor-append";
import { ActorsDeleteModal } from "./modals/actor-delete";
import { CountiesAppedModal } from "./modals/country-append";
import { CountriesDeleteModal } from "./modals/country-delete";
import { DirectorsAppedModal } from "./modals/director-append";
import { DirectorsDeleteModal } from "./modals/director-delete";
import { GenresAppedModal } from "./modals/genres-append";
import { GenresDeleteModal } from "./modals/genres-delete";
import { MoviesAppedModal } from "./modals/movie-append";
import { MovieTypesAppedModal } from "./modals/movie-types-append";
import { MovieTypeDeleteModal } from "./modals/movie-types-delete";

const pageModalsStore = usePageModalsStore();
</script>

<template>
  <MoviesAppedModal v-if="pageModalsStore.isOpen(PMN.MOVIES.APPEND)" />
  <MovieTypesAppedModal v-if="pageModalsStore.isOpen(PMN.MOVIE_TYPES.APPEND)" />
  <MovieTypeDeleteModal v-if="pageModalsStore.isOpen(PMN.MOVIE_TYPES.DELETE)" />
  <GenresAppedModal v-if="pageModalsStore.isOpen(PMN.GENRES.APPEND)" />
  <GenresDeleteModal v-if="pageModalsStore.isOpen(PMN.GENRES.DELETE)" />
  <CountiesAppedModal v-if="pageModalsStore.isOpen(PMN.COUNTRIES.APPEND)" />
  <CountriesDeleteModal v-if="pageModalsStore.isOpen(PMN.COUNTRIES.DELETE)" />
  <ActorsAppedModal v-if="pageModalsStore.isOpen(PMN.ACTORS.APPEND)" />
  <ActorsDeleteModal v-if="pageModalsStore.isOpen(PMN.ACTORS.DELETE)" />
  <DirectorsAppedModal v-if="pageModalsStore.isOpen(PMN.DIRECTORS.APPEND)" />
  <DirectorsDeleteModal v-if="pageModalsStore.isOpen(PMN.DIRECTORS.DELETE)" />
</template>

<style module lang="scss"></style>
