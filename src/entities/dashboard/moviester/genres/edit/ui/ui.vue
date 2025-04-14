<script setup lang="ts">
import { CInput } from "@/shared/components";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesterGenreEditStore } from "../model/genre-edit.store";

const router = useRouter();
const route = useRoute();
const moviesterGenreEditStore = useMoviesterGenreEditStore();

onBeforeMount(() => {
  const genreId = route?.params?.id ?? null;
  if (genreId) moviesterGenreEditStore.init(+genreId);
  else router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.LIST });
});
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.container" v-if="moviesterGenreEditStore.genre">
      <div :class="$style.title">Обновления жанра {{ moviesterGenreEditStore?.genreCopy?.name?.ru ?? "" }}</div>
      <div :class="$style.subtitle">На русском языке</div>
      <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterGenreEditStore.genre.name.ru" />
      <div :class="$style.subtitle">На английском языке</div>
      <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterGenreEditStore.genre.name.en" />
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
