<script setup lang="ts">
import { useMoviesterDirectorEditStore } from "@/entities/dashboard/moviester/directors/edit/model/director-edit.store";
import { CButton, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterDirectorEditStore = useMoviesterDirectorEditStore();

const closeModal = () => {
  if (moviesterDirectorEditStore.isDeleted) return;
  pageModalsStore.close(PMN.DIRECTORS.DELETE);
};
</script>

<template>
  <CModal title="Удалить режиссера" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.text">
        Вы действительно хотите удалить режиссера {{ moviesterDirectorEditStore?.directorCopy?.name?.ru }} ?
      </div>
      <div :class="$style.controlls">
        <CButton :loading="moviesterDirectorEditStore.isDeleted" @click="moviesterDirectorEditStore.delete">
          Удалить
        </CButton>
        <CButton type="cancel" :disabled="moviesterDirectorEditStore.isDeleted" @click="closeModal">Отмена</CButton>
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
