<script setup lang="ts">
import { MoviesterDirectorsList } from "@/entities/dashboard/moviester/directors";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";

const pageModalsStore = usePageModalsStore();
</script>

<template>
  <PageHeaderWidget title="Режиссеры">
    <template v-slot:controlls>
      <CButton @click="pageModalsStore.init(PMN.DIRECTORS.APPEND)"> Добавить </CButton>
    </template>
  </PageHeaderWidget>
  <MoviesterDirectorsList />
</template>
