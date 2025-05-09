<script setup lang="ts">
import { MoviesterDirectorEdit } from "@/entities/dashboard/moviester/directors/edit";
import { useMoviesterDirectorEditStore } from "@/entities/dashboard/moviester/directors/edit/model/director-edit.store";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";

const pageModalsStore = usePageModalsStore();
const moviesterDirectorEditStore = useMoviesterDirectorEditStore();
</script>

<template>
  <PageHeaderWidget title="Режиссеры">
    <template v-slot:controlls>
      <div :class="$style.controlls">
        <CButton
          :class="$style.btn"
          :disabled="!moviesterDirectorEditStore.isChange || moviesterDirectorEditStore.isDeleted"
          :loading="moviesterDirectorEditStore.isUpdated"
          @click="moviesterDirectorEditStore.update"
        >
          Обновить
        </CButton>
        <CButton
          :disabled="moviesterDirectorEditStore.isUpdated"
          :loading="moviesterDirectorEditStore.isDeleted"
          @click="pageModalsStore.init(PMN.DIRECTORS.DELETE)"
        >
          Удалить
        </CButton>
      </div>
    </template>
  </PageHeaderWidget>
  <MoviesterDirectorEdit />
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
