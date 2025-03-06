<script setup lang="ts">
import { onMounted } from "vue";
import { useAccountsListStore } from "../model";

const accountsListStore = useAccountsListStore();

onMounted(() => {
  accountsListStore.init();
});
</script>

<template></template>

<style module lang="scss"></style>
