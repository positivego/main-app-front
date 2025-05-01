<script setup lang="ts">
import { useMoviesterActorEditStore } from "@/entities/dashboard/moviester/actors/edit/model/actor-edit.store";
import { CButton, CModal } from "@/shared/components";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterActorEditStore = useMoviesterActorEditStore();

const closeModal = () => {
  if (moviesterActorEditStore.isDeleted) return;
  pageModalsStore.close(PMN.ACTORS.DELETE);
};
</script>

<template>
  <CModal title="Удалить актера" v-if="pageModalsStore.isOpen(PMN.ACTORS.DELETE)" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.text">
        Вы действительно хотите удалить актера {{ moviesterActorEditStore?.actorCopy?.name?.ru }} ?
      </div>
      <div :class="$style.controlls">
        <CButton :loading="moviesterActorEditStore.isDeleted" @click="moviesterActorEditStore.delete">
          Удалить
        </CButton>
        <CButton type="cancel" :disabled="moviesterActorEditStore.isDeleted" @click="closeModal">Отмена</CButton>
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
