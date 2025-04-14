<script setup lang="ts">
import { MoviesterMovieTypeEdit } from "@/entities/dashboard";
import { useMoviesterMovieTypeEditStore } from "@/entities/dashboard/moviester/movie-types/edit/model/movie-type-edit.store";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";

const moviesterMovieTypeEditStore = useMoviesterMovieTypeEditStore();
const pageModalsStore = usePageModalsStore();
</script>

<template>
  <PageHeaderWidget title="Типы">
    <template v-slot:controlls>
      <div :class="$style.controlls">
        <CButton
          :class="$style.btn"
          :disabled="!moviesterMovieTypeEditStore.isChange || moviesterMovieTypeEditStore.isDeleted"
          :loading="moviesterMovieTypeEditStore.isUpdated"
          @click="moviesterMovieTypeEditStore.update"
        >
          Обновить
        </CButton>
        <CButton
          :disabled="moviesterMovieTypeEditStore.isUpdated"
          :loading="moviesterMovieTypeEditStore.isDeleted"
          @click="pageModalsStore.init(PMN.MOVIE_TYPES.DELETE)"
        >
          Удалить
        </CButton>
      </div>
    </template>
  </PageHeaderWidget>
  <MoviesterMovieTypeEdit />
</template>

<style module lang="scss">
.controlls {
  position: relative;
  display: flex;

  .btn {
    margin-right: 10px;
  }
}
</style>
