<script setup lang="ts">
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { useRouter } from "vue-router";
import type { AsaidMenuItem } from "../types";

const router = useRouter();

const menuItems: AsaidMenuItem[] = [
  {
    type: "title",
    name: "Основное",
  },
  {
    type: "link",
    name: "Статистика",
    routeName: ROUTES_NAMES.DASHBOARD.STATISTIC,
  },
  {
    type: "title",
    name: "Пользователи",
  },
  {
    type: "link",
    name: "Список",
    routeName: ROUTES_NAMES.DASHBOARD.ACCOUNTS.LIST,
  },
];

const go = (routeName: string | undefined) => {
  if (routeName?.length) return router.push({ name: routeName });
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="(item, key) in menuItems" :key="key">
      <div v-if="item.type == 'title'" :class="$style.title">{{ item.name }}</div>
      <div v-if="item.type == 'link'" :class="$style.link" @click="go(item.routeName)">{{ item.name }}</div>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  width: $asaid-menu-width;
  height: 100vh;
  border-right: solid 1px $border-color;

  .item {
    position: relative;
    width: 100%;

    .title {
      position: relative;
      padding: 20px 20px 10px 20px;
      text-transform: uppercase;
      font-size: 16px;
    }

    .link {
      position: relative;
      padding: 0 20px 10px 20px;
      font-size: 14px;
      cursor: pointer;
      color: $subtext-color;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
