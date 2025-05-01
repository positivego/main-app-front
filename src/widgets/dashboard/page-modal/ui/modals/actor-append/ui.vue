<script setup lang="ts">
import { useMoviesterActorStore } from "@/entities/dashboard/moviester/actors/list/model/actor.store";
import { CButton, CImageUploader, CInput, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterActorStore = useMoviesterActorStore();

const closeModal = () => {
  if (moviesterActorStore.isLoading) return;
  pageModalsStore.close(PMN.ACTORS.APPEND);
  moviesterActorStore.reset();
};
</script>

<template>
  <CModal title="Добавить актера" v-if="pageModalsStore.isOpen(PMN.ACTORS.APPEND)" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.container">
        <div :class="$style.title">Введите имя актера на разных языках</div>
        <div :class="$style.subtitle">На русском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterActorStore.actor.data.name.ru" />
        <div :class="$style.subtitle">На английском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterActorStore.actor.data.name.en" />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Выберите изображение для актера</div>
        <CImageUploader :class="$style.imageUploader" @update:files="moviesterActorStore.changeImages" />
      </div>

      <div :class="$style.controlls">
        <CButton
          :loading="moviesterActorStore.isLoading"
          :disabled="!moviesterActorStore.currentValus"
          @click="moviesterActorStore.append"
        >
          Добавить
        </CButton>
        <CButton type="cancel" :disabled="moviesterActorStore.isLoading" @click="closeModal">Отмена</CButton>
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
