<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  size: {
    default: 25,
    type: Number,
  },
  color: {
    default: "#ae4444",
    type: String,
  },
});

const spinnerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderColor: `${props.color} ${props.color} ${props.color} transparent`,
}));
</script>

<template>
  <div :class="$style.spinner" :style="spinnerStyle"></div>
</template>

<style module lang="scss">
.spinner {
  display: inline-block;
  border: 4px solid;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
