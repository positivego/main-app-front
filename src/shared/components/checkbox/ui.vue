<script setup lang="ts">
import { defineEmits, defineProps, type PropType } from "vue";

const props = defineProps({
  direction: {
    type: String as PropType<"right" | "left">,
    default: "left",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const toggleCheckbox = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <label :class="[$style.checkbox, { [$style.checked]: props.modelValue }]" @click="toggleCheckbox">
    <span :class="[$style.label, $style.label__left]" v-if="props.direction == 'left'"><slot /></span>
    <div :class="$style.box">
      <svg v-if="props.modelValue" viewBox="0 0 24 24">
        <path d="M5 12l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <span :class="[$style.label, $style.label__right]" v-if="props.direction == 'right'"><slot /></span>
  </label>
</template>

<style module lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.box {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $subtext-color;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  svg {
    width: 14px;
    height: 14px;
    stroke: white;
    fill: none;
  }
}

.label {
  position: relative;
  font-size: 14px;
  color: $subtext-color;

  &__left {
    margin-right: 10px;
  }

  &__right {
    margin-left: 10px;
  }
}

.checked .box {
  background-color: $subtext-color-active;
  border-color: $subtext-color-active;
}

.checked svg {
  stroke: white;
}
</style>
