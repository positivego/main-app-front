<script setup lang="ts">
import { useMoviesterCountryStore } from "@/entities/dashboard/moviester/countries/list/model/country.store";
import { CButton, CInput, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterCountryStore = useMoviesterCountryStore();

const closeModal = () => {
  if (moviesterCountryStore.isLoading) return;
  pageModalsStore.close(PMN.COUNTRIES.APPEND);
  moviesterCountryStore.reset();
};
</script>

<template>
  <CModal title="Добавить страну" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.container">
        <div :class="$style.title">Введите название страны на разных языках</div>
        <div :class="$style.subtitle">На русском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterCountryStore.country.name.ru" />
        <div :class="$style.subtitle">На английском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterCountryStore.country.name.en" />
      </div>
      <div :class="$style.controlls">
        <CButton
          :loading="moviesterCountryStore.isLoading"
          :disabled="!moviesterCountryStore.currentValus"
          @click="moviesterCountryStore.append"
        >
          Добавить
        </CButton>
        <CButton type="cancel" :disabled="moviesterCountryStore.isLoading" @click="closeModal">Отмена</CButton>
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
