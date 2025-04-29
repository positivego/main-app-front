<script setup lang="ts"></script>

<template>
  <div>123</div>
  <!-- <PageHeaderWidget title="Страны">
    <template v-slot:controlls>
      <div :class="$style.controlls">
        <CButton
          :class="$style.btn"
          :disabled="!moviesterCountryEditStore.isChange || moviesterCountryEditStore.isDeleted"
          :loading="moviesterCountryEditStore.isUpdated"
          @click="moviesterCountryEditStore.update"
        >
          Обновить
        </CButton>
        <CButton
          :disabled="moviesterCountryEditStore.isUpdated"
          :loading="moviesterCountryEditStore.isDeleted"
          @click="pageModalsStore.init(PMN.COUNTRIES.DELETE)"
        >
          Удалить
        </CButton>
      </div>
    </template>
  </PageHeaderWidget>
  <MoviesterCountryEdit /> -->
</template>

<style module lang="scss">
.controlls {
  position: relative;
  display: flex;

  .btn {
    margin-right: 10px;
  }
}
</style>
