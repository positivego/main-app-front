<script setup lang="ts">
import { CImageUploader, CInput } from "@/shared/components";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesterDirectorEditStore } from "../model/director-edit.store";

const router = useRouter();
const route = useRoute();
const moviesterDirectorEditStore = useMoviesterDirectorEditStore();

onBeforeMount(() => {
  const directorId = route?.params?.id ?? null;
  if (directorId) moviesterDirectorEditStore.init(+directorId);
  else router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.DIRECTORS.LIST });
});
</script>

<template>
  <div :class="$style.root" v-if="moviesterDirectorEditStore.director">
    <div :class="$style.container">
      <div :class="$style.title">
        Обновление режиссера {{ moviesterDirectorEditStore?.directorCopy?.name?.ru ?? "" }}
      </div>
      <div :class="$style.subtitle">На русском языке</div>
      <CInput :class="$style.input" placeholder="Введите имя" v-model="moviesterDirectorEditStore.director.name.ru" />
      <div :class="$style.subtitle">На английском языке</div>
      <CInput :class="$style.input" placeholder="Введите имя" v-model="moviesterDirectorEditStore.director.name.en" />
    </div>

    <div :class="$style.container">
      <div :class="$style.title">Обновление изображений для режиссера</div>
      <CImageUploader
        :uploads-images="moviesterDirectorEditStore.director.images"
        @update:files="moviesterDirectorEditStore.changeImages"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  margin: 0 20px;

  .container {
    position: relative;
    display: flex;
    flex-direction: column;

    .title {
      position: relative;
      font-size: 24px;
      margin-bottom: 15px;
    }

    .subtitle {
      position: relative;
      font-size: 12px;
      color: $subtext-color;
      margin-bottom: 10px;
    }

    .input {
      position: relative;
      margin-bottom: 15px;
    }
  }
}
</style>
