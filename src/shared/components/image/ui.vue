<script setup lang="ts">
import { computed, useCssModule, type PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"avatar" | "poster">,
    default: "avatar",
  },
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 25,
  },
  height: {
    type: Number,
    default: 25,
  },
});

const style = useCssModule();

const rootClasses = computed(() => ({
  [style.root]: true,
  [style.avatar]: props.type === "avatar",
}));

const rootStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}));

const mainLetter = computed(() => {
  if (props?.alt?.length) return props.alt[0];
  else return "X";
});
</script>

<template>
  <div :class="rootClasses" :style="rootStyles">
    <img v-if="props?.src?.length" :src="props.src" :alt="props.alt" />
    <div v-else :class="$style.noImage">
      <span>{{ mainLetter }}</span>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .noImage {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $border-color-active;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      position: relative;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      color: $subtext-color !important;
    }
  }
}

.avatar {
  border-radius: 100%;
}
</style>
