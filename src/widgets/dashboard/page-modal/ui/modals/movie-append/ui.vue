<script setup lang="ts">
import { useMoviesterMovieStore } from "@/entities/dashboard/moviester/movies/list/model/movie.store";
import { CButton, CDropdown, CImageUploader, CInput, CModal, CSpinner } from "@/shared/components";
import { onMounted } from "vue";
import { PAGE_MODALS_NAMES as PMN } from "../../../constants";
import { usePageModalsStore } from "../../../model";

const pageModalsStore = usePageModalsStore();
const moviesterMovieStore = useMoviesterMovieStore();

const closeModal = () => {
  if (moviesterMovieStore.isLoading) return;
  pageModalsStore.close(PMN.MOVIES.APPEND);
  moviesterMovieStore.reset();
};

onMounted(() => {
  moviesterMovieStore.loadData();
});
</script>

<template>
  <CModal title="Добавить кино" @close="closeModal">
    <div :class="$style.root" v-if="!moviesterMovieStore.isDataLoading">
      <div :class="$style.container">
        <div :class="$style.title">Выберите постер</div>
        <CImageUploader
          :class="$style.imageUploader"
          :image-height="150"
          :button-height="150"
          @update:files="moviesterMovieStore.changePoster"
        />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Введите название на разных языках</div>
        <div :class="$style.subtitle">На русском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterMovieStore.movie.data.name.ru" />
        <div :class="$style.subtitle">На английском языке</div>
        <CInput :class="$style.input" placeholder="Введите название" v-model="moviesterMovieStore.movie.data.name.en" />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Данные</div>
        <div :class="$style.subtitle">Тип</div>
        <CDropdown
          :class="$style.dropdown"
          v-model="moviesterMovieStore.movie.data.typeId"
          :items="moviesterMovieStore.types"
          searchable
          :clearable="false"
        />
        <div :class="$style.subtitle">Жанры</div>
        <CDropdown
          :class="$style.dropdown"
          v-model="moviesterMovieStore.movie.data.genresIds"
          :items="moviesterMovieStore.genres"
          multiple
          searchable
        />
        <div :class="$style.subtitle">Страна</div>
        <CDropdown
          :class="$style.dropdown"
          v-model="moviesterMovieStore.movie.data.countryId"
          :items="moviesterMovieStore.countries"
          searchable
          :clearable="false"
        />
        <div :class="$style.subtitle">Режиссер</div>
        <CDropdown
          :class="$style.dropdown"
          v-model="moviesterMovieStore.movie.data.directorId"
          :items="moviesterMovieStore.directors"
          searchable
          :clearable="false"
        />
        <div :class="$style.subtitle">Актеры</div>
        <CDropdown
          :class="$style.dropdown"
          v-model="moviesterMovieStore.movie.data.actorsIds"
          :items="moviesterMovieStore.actors"
          searchable
          multiple
        />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Описание</div>
        <CInput
          :class="$style.input"
          type="textarea"
          placeholder="Введите описание"
          v-model="moviesterMovieStore.movie.data.description"
        />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Дата и продолжительность</div>
        <CInput
          :class="$style.input"
          placeholder="Введите дату релиза"
          v-model="moviesterMovieStore.movie.data.timeCount"
        />

        <CInput
          :class="$style.input"
          placeholder="Введите год релиза"
          v-model="moviesterMovieStore.movie.data.releseYaer"
        />

        <CInput
          :class="$style.input"
          placeholder="Введите продолжительность"
          v-model="moviesterMovieStore.movie.data.releseDate"
        />
      </div>

      <div :class="$style.container">
        <div :class="$style.title">Выберите изображения</div>
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

    <div :class="$style.root" v-else>
      <div :class="$style.spinner">
        <CSpinner></CSpinner>
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

    .dropdown {
      margin-bottom: 15px;
    }
  }

  .controlls {
    position: relative;
    display: flex;
    padding-top: 15px;
  }

  .spinner {
    position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
