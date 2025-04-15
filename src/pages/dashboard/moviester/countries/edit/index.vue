<script setup lang="ts">
import { MoviesterCountryEdit } from "@/entities/dashboard";
import { useMoviesterCountryEditStore } from "@/entities/dashboard/moviester/countries/edit/model/country-edit.store";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";

const pageModalsStore = usePageModalsStore();
const moviesterCountryEditStore = useMoviesterCountryEditStore();
</script>

<template>
  <PageHeaderWidget title="Страны">
    <template v-slot:controlls>
      <div :class="$style.controlls">
        <CButton
          :class="$style.btn"
          :disabled="!moviesterCountryEditStore.isChange || moviesterCountryEditStore.isDeleted"
          :loading="moviesterCountryEditStore.isUpdated"
          @click="moviesterCountryEditStore.update"
        >
          Обновить
        </CButton>
        <CButton
          :disabled="moviesterCountryEditStore.isUpdated"
          :loading="moviesterCountryEditStore.isDeleted"
          @click="pageModalsStore.init(PMN.COUNTRIES.DELETE)"
        >
          Удалить
        </CButton>
      </div>
    </template>
  </PageHeaderWidget>
  <MoviesterCountryEdit />
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
