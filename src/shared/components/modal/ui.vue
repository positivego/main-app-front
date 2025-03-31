<script setup lang="ts">
import { CSpinner } from "../spinner";

const props = defineProps({
  title: {
    type: String,
    default: "Заголовок",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.background" @click="emit('close')"></div>
    <div :class="$style.modalContainer">
      <div :class="$style.modal">
        <div :class="$style.titleContainer">
          <div :class="$style.title">{{ props.title }}</div>
          <div :class="$style.closeBtn" @click="emit('close')">
            <svg>
              <use xlink:href="#common-xmark"></use>
            </svg>
          </div>
        </div>
        <slot></slot>
        <div v-if="props.loading" :class="$style.spinner">
          <CSpinner />
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000050;
    z-index: 1;
  }

  .modalContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .modal {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 35px 25px;
      width: 400px;
      min-height: 100px;
      border-radius: 5px;
      background-color: $body-color;
      box-shadow: 0px 0px 20px 0px #000000a3;
      z-index: 10;
      overflow: hidden;

      .titleContainer {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;

        .title {
          position: relative;
          width: calc(100% - 50px);
          font-size: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .closeBtn {
          position: relative;
          color: #c6c6c6;

          svg {
            position: relative;
            width: 15px;
            height: 15px;
            cursor: pointer;

            &:hover {
              color: $subtext-color-active;
            }
          }
        }
      }

      .spinner {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: $body-color;
      }
    }
  }
}
</style>
