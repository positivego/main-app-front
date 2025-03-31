<script setup lang="ts">
import { CPagination, CTable } from "@/shared/components";
import type { CTableColumn } from "@/shared/components/table/ui.vue";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesterGenresListStore } from "../model/genres.store";

const router = useRouter();
const moviesterGenresListStore = useMoviesterGenresListStore();

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
  router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.EDIT, params: { id } });
};

onMounted(() => {
  moviesterGenresListStore.get();
});
</script>

<template>
  <CTable :columns="columns" :rows="moviesterGenresListStore.genres" :is-loading="moviesterGenresListStore.isLoading">
    <template #name="{ row }">
      <div :class="$style.name" @click="go(row.id)">{{ row.name.ru }}</div>
    </template>
  </CTable>

  <CPagination
    :page-count="moviesterGenresListStore.pagination.pageCount"
    :current-page="moviesterGenresListStore.pagination.page"
    :limit="moviesterGenresListStore.pagination.limit"
    @on-prev-page="moviesterGenresListStore.onSelectPrevPage"
    @on-next-page="moviesterGenresListStore.onSelectNextPage"
    @on-select-page="moviesterGenresListStore.onSelectPage"
    @on-change-limit="moviesterGenresListStore.onChangeLimit"
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
