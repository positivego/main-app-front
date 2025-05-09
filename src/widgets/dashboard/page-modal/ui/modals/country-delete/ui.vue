<script setup lang="ts">
import { useMoviesterCountryEditStore } from "@/entities/dashboard/moviester/countries/edit/model/country-edit.store";
import { CButton, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterCountryEditStore = useMoviesterCountryEditStore();

const closeModal = () => {
  if (moviesterCountryEditStore.isDeleted) return;
  pageModalsStore.close(PMN.COUNTRIES.DELETE);
};
</script>

<template>
  <CModal title="Удалить страну" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.text">
        Вы действительно хотите удалить страну {{ moviesterCountryEditStore?.countryCopy?.name?.ru }} ?
      </div>
      <div :class="$style.controlls">
        <CButton :loading="moviesterCountryEditStore.isDeleted" @click="moviesterCountryEditStore.delete">
          Удалить
        </CButton>
        <CButton type="cancel" :disabled="moviesterCountryEditStore.isDeleted" @click="closeModal">Отмена</CButton>
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
