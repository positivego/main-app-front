<script setup lang="ts">
import { useMoviesterGenreEditStore } from "@/entities/dashboard/moviester/genres/edit/model/genre-edit.store";
import { CButton, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterGenreEditStore = useMoviesterGenreEditStore();

const closeModal = () => {
  if (moviesterGenreEditStore.isDeleted) return;
  pageModalsStore.close(PMN.GENRES.DELETE);
};
</script>

<template>
  <CModal title="Удалить жанр" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.text">
        Вы действительно хотите удалить жанр {{ moviesterGenreEditStore?.genreCopy?.name?.ru }} ?
      </div>
      <div :class="$style.controlls">
        <CButton :loading="moviesterGenreEditStore.isDeleted" @click="moviesterGenreEditStore.delete">
          Удалить
        </CButton>
        <CButton type="cancel" :disabled="moviesterGenreEditStore.isDeleted" @click="closeModal">Отмена</CButton>
      </div>
    </div>
  </CModal>
</template>

<style module lang="scss">
.root {
  position: relative;

  .text {
    position: relative;
    padding-top: 15px;
  }

  .controlls {
    position: relative;
    display: flex;
    padding-top: 15px;
  }
}
</style>
