<script setup lang="ts">
import { computed, useCssModule, type PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"default" | "accept">,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
const style = useCssModule();

const buttonClass = computed(() => ({
  [style.button]: true,
  [style.buttonDefault]: props.type === "default" && !props.disabled,
  [style.buttonDisabled]: props.disabled,
}));

const handleClick = (event: MouseEvent) => {
  if (!props?.disabled) emit("click", event);
};
</script>

<template>
  <div :class="buttonClass" @click="handleClick">
    <slot></slot>
  </div>
</template>

<style module lang="scss">
.button {
  position: relative;
  padding: 7px 15px;
  border-radius: 3px;
  border: 1px solid $border-color;
  font-size: 12px;
  cursor: pointer;
  color: #c6c6c6;
}

.buttonDefault {
  transition: 0.3s;
  &:hover {
    border: 1px solid $border-color-active;
  }
}

.buttonDisabled {
  opacity: 0.7;
  cursor: not-allowed !important;
}
</style>
