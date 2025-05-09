<script setup lang="ts">
import { useMoviesterMovieTypeEditStore } from "@/entities/dashboard/moviester/movie-types/edit/model/movie-type-edit.store";
import { CButton, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterMovieTypeEditStore = useMoviesterMovieTypeEditStore();

const closeModal = () => {
  if (moviesterMovieTypeEditStore.isDeleted) return;
  pageModalsStore.close(PMN.MOVIE_TYPES.DELETE);
};
</script>

<template>
  <CModal title="Удалить тип" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.text">
        Вы действительно хотите удалить тип {{ moviesterMovieTypeEditStore?.typeCopy?.name?.ru }} ?
      </div>
      <div :class="$style.controlls">
        <CButton :loading="moviesterMovieTypeEditStore.isDeleted" @click="moviesterMovieTypeEditStore.delete">
          Удалить
        </CButton>
        <CButton type="cancel" :disabled="moviesterMovieTypeEditStore.isDeleted" @click="closeModal">Отмена</CButton>
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
