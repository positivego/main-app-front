<script setup lang="ts">
import { type PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"input" | "textarea">,
    default: "input",
  },
  placeholder: {
    type: String,
    default: "Введите",
  },
  showCounter: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: any) => {
  if (!props.maxLength || event.target.value.length <= props.maxLength) {
    emit("update:modelValue", event.target.value);
  }
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.input" v-if="props.type == 'input'">
      <input
        type="text"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :maxlength="props.maxLength || undefined"
        @input="updateValue"
      />
    </div>

    <div :class="$style.textarea" v-if="props.type == 'textarea'">
      <textarea
        rows="5"
        cols="33"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :maxlength="props.maxLength || undefined"
        @input="updateValue"
      ></textarea>
    </div>

    <div :class="$style.counter" v-if="props.showCounter">{{ props?.modelValue?.length }} / {{ props.maxLength }}</div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  width: 100%;

  input,
  textarea {
    position: relative;
    width: calc(100% - 15px);
    height: 30px;
    color: #c6c6c6;
    border: 1px solid $border-color;
    outline: none;
    background-color: transparent;
    font-size: 12px;
    border-radius: 3px;
    padding: 0 7px;
    color: $subtext-color;

    &:hover {
      border: 1px solid $border-color-active;
      box-shadow: 0px 0px 3px $border-color-active;
    }

    &:focus {
      border: 1px solid $border-color-active;
    }
  }

  .input {
  }

  .textarea {
  }

  .counter {
    position: relative;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    padding-top: 7px;
    color: $subtext-color;
    margin-bottom: 10px;
  }
}
</style>
