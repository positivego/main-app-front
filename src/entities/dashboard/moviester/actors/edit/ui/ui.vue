<script setup lang="ts">
import { CInput } from "@/shared/components";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesterActorEditStore } from "../model/actor-edit.store";

const router = useRouter();
const route = useRoute();
const moviesterActorEditStore = useMoviesterActorEditStore();

onBeforeMount(() => {
  const actorId = route?.params?.id ?? null;
  if (actorId) moviesterActorEditStore.init(+actorId);
  else router.push({ name: ROUTES_NAMES.DASHBOARD.MOVIESTER.ACTORS.LIST });
});
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.container" v-if="moviesterActorEditStore.actor">
      <div :class="$style.title">Обновления актера {{ moviesterActorEditStore?.actorCopy?.name?.ru ?? "" }}</div>
      <div :class="$style.subtitle">На русском языке</div>
      <CInput :class="$style.input" placeholder="Введите имя" v-model="moviesterActorEditStore.actor.name.ru" />
      <div :class="$style.subtitle">На английском языке</div>
      <CInput :class="$style.input" placeholder="Введите имя" v-model="moviesterActorEditStore.actor.name.en" />
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
