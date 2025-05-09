<script setup lang="ts">
import { useMoviesterMovieStore } from "@/entities/dashboard/moviester/movies/list/model/movie.store";
import { CButton, CDropdown, CImageUploader, CInput, CModal } from "@/shared/components";
import { onMounted, ref } from "vue";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterMovieStore = useMoviesterMovieStore();

const closeModal = () => {
  if (moviesterMovieStore.isLoading) return;
  pageModalsStore.close(PMN.MOVIES.APPEND);
  moviesterMovieStore.reset();
};

const testDropElements = [
  {
    id: 1,
    label: "Тест 1",
  },
  {
    id: 2,
    label: "Тест 2",
  },
  {
    id: 3,
    label: "Тест 3",
  },
];

const testDropElementsVal = ref(undefined);
const testDropElementsValDVA = ref([]);

onMounted(() => {
  moviesterMovieStore.loadData();
});
</script>

<template>
  <CModal title="Добавить фильм" @close="closeModal">
    <div :class="$style.root">
      <div :class="$style.container">
        <div :class="$style.title">Выберите постер для фильма</div>
        <CImageUploader
          :class="$style.imageUploader"
          :image-height="150"
          :button-height="150"
          @update:files="moviesterMovieStore.changePoster"
        />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Введите название фильма на разных языках</div>
        <div :class="$style.subtitle">На русском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterMovieStore.movie.data.name.ru" />
        <div :class="$style.subtitle">На английском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterMovieStore.movie.data.name.en" />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Тест</div>
        <div class="" style="display: flex">
          <CDropdown style="margin-right: 25px" v-model="testDropElementsVal" searchable :items="testDropElements" />
          <CDropdown v-model="testDropElementsValDVA" multiple searchable :items="testDropElements" />
        </div>
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Выберите изображения для фильма</div>
        <CImageUploader
          :class="$style.imageUploader"
          :image-width="150"
          :button-width="150"
          @update:files="moviesterMovieStore.changeImages"
        />
      </div>

      <div :class="$style.controlls">
        <CButton
          :loading="moviesterMovieStore.isLoading"
          :disabled="!moviesterMovieStore.currentValus"
          @click="moviesterMovieStore.append"
        >
          Добавить
        </CButton>
        <CButton type="cancel" :disabled="moviesterMovieStore.isLoading" @click="closeModal">Отмена</CButton>
      </div>
    </div>
  </CModal>
</template>

<style module lang="scss">
.root {
  position: relative;

  .container {
    position: relative;
    padding-top: 15px;

    .title {
      position: relative;
      font-size: 15px;
      margin-bottom: 20px;
    }

    .subtitle {
      position: relative;
      font-size: 12px;
      margin-bottom: 7px;
      color: $subtext-color;
    }

    .input {
      margin-bottom: 15px;
    }

    .imageUploader {
      margin-bottom: 15px;
    }
  }

  .controlls {
    position: relative;
    display: flex;
    padding-top: 15px;
  }
}
</style>
