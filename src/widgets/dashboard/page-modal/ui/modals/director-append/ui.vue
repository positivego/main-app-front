<script setup lang="ts">
import { useMoviesterDirectorStore } from "@/entities/dashboard/moviester/directors/list/model/director.store";
import { CButton, CImageUploader, CInput, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterDirectorStore = useMoviesterDirectorStore();

const closeModal = () => {
  if (moviesterDirectorStore.isLoading) return;
  pageModalsStore.close(PMN.DIRECTORS.APPEND);
  moviesterDirectorStore.reset();
};
</script>

<template>
  <CModal title="Добавить режиссера" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.container">
        <div :class="$style.title">Введите имя режиссера на разных языках</div>
        <div :class="$style.subtitle">На русском языке</div>
        <CInput
          :class="$style.input"
          placeholder="Введите название"
          v-model="moviesterDirectorStore.director.data.name.ru"
        />
        <div :class="$style.subtitle">На английском языке</div>
        <CInput
          :class="$style.input"
          placeholder="Введите название"
          v-model="moviesterDirectorStore.director.data.name.en"
        />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Выберите изображения для режиссера</div>
        <CImageUploader :class="$style.imageUploader" @update:files="moviesterDirectorStore.changeImages" />
      </div>

      <div :class="$style.controlls">
        <CButton
          :loading="moviesterDirectorStore.isLoading"
          :disabled="!moviesterDirectorStore.currentValus"
          @click="moviesterDirectorStore.append"
        >
          Добавить
        </CButton>
        <CButton type="cancel" :disabled="moviesterDirectorStore.isLoading" @click="closeModal">Отмена</CButton>
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

    .imageUploader {
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
