<script setup lang="ts">
import { CImage, CPagination, CTable } from "@/shared/components";
import type { CTableColumn } from "@/shared/components/table/ui.vue";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesterActorsListStore } from "../model/actors.store";

const router = useRouter();
const moviesterActorsListStore = useMoviesterActorsListStore();

const columns: CTableColumn[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Название",
  },
  {
    key: "slug",
    label: "slug",
  },
];

const go = (id: number) => {
  router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.ACTORS.EDIT, params: { id } });
};

onMounted(() => {
  moviesterActorsListStore.get();
});
</script>

<template>
  <CTable :columns="columns" :rows="moviesterActorsListStore.actors" :is-loading="moviesterActorsListStore.isLoading">
    <template #name="{ row }">
      <div :class="$style.name" @click="go(row.id)">
        <div :class="$style.img"><CImage :src="row.images[0]" /></div>
        {{ row.name.ru }}
      </div>
    </template>
  </CTable>

  <CPagination
    :page-count="moviesterActorsListStore.pagination.pageCount"
    :current-page="moviesterActorsListStore.pagination.page"
    :limit="moviesterActorsListStore.pagination.limit"
    @on-prev-page="moviesterActorsListStore.onSelectPrevPage"
    @on-next-page="moviesterActorsListStore.onSelectNextPage"
    @on-select-page="moviesterActorsListStore.onSelectPage"
    @on-change-limit="moviesterActorsListStore.onChangeLimit"
  />
</template>

<style module lang="scss">
.name {
  position: relative;
  display: flex;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;

  .img {
    margin-right: 10px;
  }

  &:hover {
    color: $border-color-active;
    text-decoration: underline;
  }
}
</style>
