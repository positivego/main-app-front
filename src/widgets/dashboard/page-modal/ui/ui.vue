<script setup lang="ts">
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
</template>

<style module lang="scss"></style>
