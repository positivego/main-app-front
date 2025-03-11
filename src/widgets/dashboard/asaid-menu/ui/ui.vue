<script setup lang="ts">
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { AsaidMenuItem } from "../types";

const router = useRouter();
const route = useRoute();

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

const currentRouteName = computed(() => {
  return route.name;
});

const go = (routeName: string | undefined) => {
  if (routeName?.length) return router.push({ name: routeName });
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.item" v-for="(item, key) in menuItems" :key="key">
      <div v-if="item.type == 'title'" :class="$style.title">{{ item.name }}</div>
      <div v-if="item.type == 'link'" :class="$style.link" @click="go(item.routeName)">
        <span>{{ item.name }}</span>
        <div v-if="currentRouteName == item.routeName" :class="$style.dot">•</div>
      </div>
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
      display: flex;
      padding: 0 20px 10px 20px;
      font-size: 14px;
      color: $subtext-color;

      span {
        position: relative;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .dot {
        position: relative;
        cursor: default;
        padding-left: 10px;
        top: 1px;
      }
    }
  }
}
</style>
