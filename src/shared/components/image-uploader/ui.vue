<script lang="ts" setup>
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  imageWidth: {
    type: Number,
    default: 100,
  },
  imageHeight: {
    type: Number,
    default: 100,
  },
  buttonWidth: {
    type: Number,
    default: 100,
  },
  buttonHeight: {
    type: Number,
    default: 100,
  },
  allowedTypes: {
    type: Array as () => string[],
    default: () => ["image/jpeg", "image/png"],
  },
  maxFileSizeKb: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits<{
  (e: "update:files", files: File[]): void;
}>();

const files = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const selectedFiles = Array.from(target.files);

  selectedFiles.forEach((file) => {
    const isValidType = props.allowedTypes.includes(file.type);
    const isValidSize = file.size <= props.maxFileSizeKb * 1024;

    if (!isValidType) {
      alert(
        `Файл "${file.name}" имеет неподдерживаемый тип (${file.type}). Разрешены: ${props.allowedTypes.join(", ")}`
      );
      return;
    }

    if (!isValidSize) {
      alert(
        `Файл "${file.name}" слишком большой (${(file.size / 1024).toFixed(1)} кб). Максимальный размер: ${
          props.maxFileSizeKb
        } кб.`
      );
      return;
    }

    files.value.push(file);
    imagePreviews.value.push(URL.createObjectURL(file));
  });

  emit("update:files", [...files.value]);
  target.value = "";
};

const removeImage = (index: number) => {
  files.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
  emit("update:files", [...files.value]);
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.previewList">
      <div
        v-for="(image, index) in imagePreviews"
        :key="index"
        :class="$style.imagePreview"
        :style="{ width: `${imageWidth}px`, height: `${imageHeight}px` }"
      >
        <img :src="image" :alt="'Preview ' + index" />

        <div :class="$style.deleteBtn" @click="removeImage(index)">
          <svg>
            <use xlink:href="#common-xmark"></use>
          </svg>
        </div>
      </div>

      <label :class="$style.uploadButton" :style="{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }">
        <svg>
          <use xlink:href="#common-plus"></use>
        </svg>
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleFileChange"
          :class="$style.fileInput"
          :disabled="loading"
        />
      </label>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  display: flex;

  .previewList {
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
    gap: 8px;

    .imagePreview {
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .deleteBtn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 3px;
        right: 3px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        background-color: $body-color;
        border-radius: 100%;

        svg {
          position: relative;
          width: 12px;
          height: 12px;
          color: #c6c6c6;
        }

        &:hover svg {
          color: $subtext-color-active;
        }
      }
    }

    .uploadButton {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      border: 1px dashed $border-color;
      cursor: pointer;
      user-select: none;
      position: relative;
      overflow: hidden;
      text-align: center;

      svg {
        position: absolute;
        width: 50%;
        height: 50%;
        color: $border-color;
      }

      .fileInput {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
