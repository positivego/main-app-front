<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAppStore } from "./shared/app";

const appStore = useAppStore();
const { isAppLoading } = storeToRefs(appStore);

onMounted(async () => {
  await appStore.init();
});
</script>

<template>
  <div v-if="isAppLoading" :class="$style.spinner">Загрузка</div>
  <div v-else class="">
    <RouterView />
  </div>
</template>

<style module lang="scss">
body {
  background-color: $body-color;
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 15px;
  color: white;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  margin: 0;
  padding: 0;
}

.spinner {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $body-color;
}
</style>
