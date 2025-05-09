<script setup lang="ts">
import { CImage, CPagination, CTable } from "@/shared/components";
import type { CTableColumn } from "@/shared/components/table/ui.vue";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesterDirectorsListStore } from "../model/directors.store";

const router = useRouter();
const moviesterDirectorsListStore = useMoviesterDirectorsListStore();

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
  router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.DIRECTORS.EDIT, params: { id } });
};

onMounted(() => {
  moviesterDirectorsListStore.get();
});
</script>

<template>
  <CTable
    :columns="columns"
    :rows="moviesterDirectorsListStore.directors"
    :is-loading="moviesterDirectorsListStore.isLoading"
  >
    <template #name="{ row }">
      <div :class="$style.name" @click="go(row.id)">
        <div :class="$style.img"><CImage :src="row.images[0]" :alt="row.name.ru" /></div>
        <div :class="$style.title">{{ row.name.ru }}</div>
      </div>
    </template>
  </CTable>

  <CPagination
    :page-count="moviesterDirectorsListStore.pagination.pageCount"
    :current-page="moviesterDirectorsListStore.pagination.page"
    :limit="moviesterDirectorsListStore.pagination.limit"
    @on-prev-page="moviesterDirectorsListStore.onSelectPrevPage"
    @on-next-page="moviesterDirectorsListStore.onSelectNextPage"
    @on-select-page="moviesterDirectorsListStore.onSelectPage"
    @on-change-limit="moviesterDirectorsListStore.onChangeLimit"
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

  &:hover .title {
    color: $border-color-active;
    text-decoration: underline;
  }
}
</style>
