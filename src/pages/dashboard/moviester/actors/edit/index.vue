<script setup lang="ts">
import { MoviesterActorEdit } from "@/entities/dashboard/moviester/actors/edit";
import { useMoviesterActorEditStore } from "@/entities/dashboard/moviester/actors/edit/model/actor-edit.store";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";

const pageModalsStore = usePageModalsStore();
const moviesterActorEditStore = useMoviesterActorEditStore();
</script>

<template>
  <PageHeaderWidget title="Актеры">
    <template v-slot:controlls>
      <div :class="$style.controlls">
        <CButton
          :class="$style.btn"
          :disabled="!moviesterActorEditStore.isChange || moviesterActorEditStore.isDeleted"
          :loading="moviesterActorEditStore.isUpdated"
          @click="moviesterActorEditStore.update"
        >
          Обновить
        </CButton>
        <CButton
          :disabled="moviesterActorEditStore.isUpdated"
          :loading="moviesterActorEditStore.isDeleted"
          @click="pageModalsStore.init(PMN.ACTORS.DELETE)"
        >
          Удалить
        </CButton>
      </div>
    </template>
  </PageHeaderWidget>
  <MoviesterActorEdit />
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
