<script setup lang="ts">
import { MoviesterActorsList } from "@/entities/dashboard/moviester/actors";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { usePageModalsStore } from "@/widgets/dashboard/page-modal";
import { PAGE_MODALS_NAMES as PMN } from "@/widgets/dashboard/page-modal/constants";

const pageModalsStore = usePageModalsStore();
</script>

<template>
  <PageHeaderWidget title="Актеры">
    <template v-slot:controlls>
      <CButton @click="pageModalsStore.init(PMN.ACTORS.APPEND)"> Добавить </CButton>
    </template>
  </PageHeaderWidget>
  <MoviesterActorsList />
</template>
