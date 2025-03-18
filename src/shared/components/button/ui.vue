<script setup lang="ts">
import { computed, useCssModule, type PropType } from "vue";
import { CSpinner } from "../spinner";

const props = defineProps({
  type: {
    type: String as PropType<"default" | "accept">,
    default: "default",
  },
  isLoading: {
    type: Boolean,
    default: false,
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
  [style.buttonDisabled]: props.disabled && !props.isLoading,
}));

const handleClick = (event: MouseEvent) => {
  if (!props?.disabled && !props.isLoading) emit("click", event);
};
</script>

<template>
  <div :class="buttonClass" @click="handleClick">
    <slot v-if="!props.isLoading"></slot>
    <div v-else :class="$style.spinner">
      <CSpinner :size="11"></CSpinner>
    </div>
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
  box-shadow: 0px 0px 3px black;
}

.buttonDefault {
  transition: 0.3s;
  &:hover {
    border: 1px solid $border-color-active;
    box-shadow: 0px 0px 3px $border-color-active;
  }
}

.buttonDisabled {
  opacity: 0.7;
  cursor: not-allowed !important;
}

.spinner {
  position: relative;
  height: 10px;
  padding: 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
