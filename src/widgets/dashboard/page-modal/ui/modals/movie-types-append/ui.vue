<script setup lang="ts">
import { useMoviesteMovieTypeStore } from "@/entities/dashboard/moviester/movie-types/list/model/movie-type.store";
import { CButton, CInput, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterMovieTypeStore = useMoviesteMovieTypeStore();

const closeModal = () => {
  if (moviesterMovieTypeStore.isLoading) return;
  pageModalsStore.close(PMN.MOVIE_TYPES.APPEND);
  moviesterMovieTypeStore.reset();
};
</script>

<template>
  <CModal title="Добавить тип" v-if="pageModalsStore.isOpen(PMN.MOVIE_TYPES.APPEND)" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.container">
        <div :class="$style.title">Введите названия типа на разных языках</div>
        <div :class="$style.subtitle">На русском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterMovieTypeStore.type.name.ru" />
        <div :class="$style.subtitle">На английском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterMovieTypeStore.type.name.en" />
      </div>
      <div :class="$style.controlls">
        <CButton
          :loading="moviesterMovieTypeStore.isLoading"
          :disabled="!moviesterMovieTypeStore.currentValus"
          @click="moviesterMovieTypeStore.append"
        >
          Добавить
        </CButton>
        <CButton type="cancel" :disabled="moviesterMovieTypeStore.isLoading" @click="closeModal">Отмена</CButton>
      </div>
    </div>
  </CModal>
</template>

<style module lang="scss">
.root {
  position: relative;

  .container {
    position: relative;
    padding-top: 15px;

    .title {
      position: relative;
      font-size: 15px;
      margin-bottom: 20px;
    }

    .subtitle {
      position: relative;
      font-size: 12px;
      margin-bottom: 7px;
      color: $subtext-color;
    }

    .input {
      margin-bottom: 15px;
    }
  }

  .controlls {
    position: relative;
    display: flex;
    padding-top: 15px;
  }
}
</style>
