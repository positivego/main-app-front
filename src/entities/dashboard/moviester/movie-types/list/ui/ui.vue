<script setup lang="ts">
import { CPagination, CTable } from "@/shared/components";
import type { CTableColumn } from "@/shared/components/table/ui.vue";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesterMovieTypesListStore } from "../model/movie-types.store";

const router = useRouter();
const moviesterMovieTypesListStore = useMoviesterMovieTypesListStore();

const columns: CTableColumn[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Название",
  },
];

const go = (id: number) => {
  router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.EDIT, params: { id } });
};

onMounted(() => {
  moviesterMovieTypesListStore.get();
});
</script>

<template>
  <CTable
    :columns="columns"
    :rows="moviesterMovieTypesListStore.types"
    :is-loading="moviesterMovieTypesListStore.isLoading"
  >
    <template #name="{ row }">
      <div :class="$style.name" @click="go(row.id)">{{ row.name.ru }}</div>
    </template>
  </CTable>

  <CPagination
    :page-count="moviesterMovieTypesListStore.pagination.pageCount"
    :current-page="moviesterMovieTypesListStore.pagination.page"
    :limit="moviesterMovieTypesListStore.pagination.limit"
    @on-prev-page="moviesterMovieTypesListStore.onSelectPrevPage"
    @on-next-page="moviesterMovieTypesListStore.onSelectNextPage"
    @on-select-page="moviesterMovieTypesListStore.onSelectPage"
    @on-change-limit="moviesterMovieTypesListStore.onChangeLimit"
  />
</template>

<style module lang="scss">
.name {
  position: relative;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: $border-color-active;
    text-decoration: underline;
  }
}
</style>
