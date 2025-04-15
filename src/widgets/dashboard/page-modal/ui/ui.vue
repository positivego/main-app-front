<script setup lang="ts">
import { CountiesAppedModal } from "./modals/country-append";
import { CountriesDeleteModal } from "./modals/country-delete";
import { GenresAppedModal } from "./modals/genres-append";
import { GenresDeleteModal } from "./modals/genres-delete";
import { MovieTypesAppedModal } from "./modals/movie-types-append";
import { MovieTypeDeleteModal } from "./modals/movie-types-delete";
</script>

<template>
  <MovieTypesAppedModal />
  <MovieTypeDeleteModal />
  <GenresAppedModal />
  <GenresDeleteModal />
  <CountiesAppedModal />
  <CountriesDeleteModal />
</template>

<style module lang="scss"></style>
