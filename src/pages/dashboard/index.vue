<script setup lang="ts">
import { RouterView } from "vue-router";
import { AsaidMenuWidget } from "../../widgets/dashboard/asaid-menu";
</script>

<template>
  <div :class="$style.root">
    <AsaidMenuWidget />
    <div :class="$style.view">
      <RouterView />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;

  .view {
    position: relative;
    width: calc(100% - $asaid-menu-width);
  }
}
</style>
