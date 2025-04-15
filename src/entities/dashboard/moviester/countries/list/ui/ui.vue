<script setup lang="ts">
import { CPagination, CTable } from "@/shared/components";
import type { CTableColumn } from "@/shared/components/table/ui.vue";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesterCountriesListStore } from "../model/countries.store";

const router = useRouter();
const moviesterCountriesListStore = useMoviesterCountriesListStore();

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
  router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.EDIT, params: { id } });
};

onMounted(() => {
  moviesterCountriesListStore.get();
});
</script>

<template>
  <CTable
    :columns="columns"
    :rows="moviesterCountriesListStore.countries"
    :is-loading="moviesterCountriesListStore.isLoading"
  >
    <template #name="{ row }">
      <div :class="$style.name" @click="go(row.id)">{{ row.name.ru }}</div>
    </template>
  </CTable>

  <CPagination
    :page-count="moviesterCountriesListStore.pagination.pageCount"
    :current-page="moviesterCountriesListStore.pagination.page"
    :limit="moviesterCountriesListStore.pagination.limit"
    @on-prev-page="moviesterCountriesListStore.onSelectPrevPage"
    @on-next-page="moviesterCountriesListStore.onSelectNextPage"
    @on-select-page="moviesterCountriesListStore.onSelectPage"
    @on-change-limit="moviesterCountriesListStore.onChangeLimit"
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
