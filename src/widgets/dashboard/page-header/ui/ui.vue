<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBreadcrumbsStore } from "../model";

const props = defineProps({
  title: {
    default: "Заголовок",
    type: String,
  },
});

const store = useBreadcrumbsStore();

const { breadcrumbs } = storeToRefs(store);
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.titleContent">
      <div :class="$style.title">{{ props.title }}</div>
      <nav :class="$style.breadcrumbs">
        <ul>
          <li v-for="(crumb, index) in breadcrumbs" :key="index">
            <router-link v-if="crumb.path && index !== breadcrumbs.length - 1" :to="crumb.path" :class="$style.link">
              {{ crumb.title }}
            </router-link>
            <span v-else>{{ crumb.title }}</span>
          </li>
        </ul>
      </nav>
    </div>
    <div :class="$style.controlls">
      <slot name="controlls"></slot>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .titleContent {
    position: relative;
    display: flex;
    align-items: baseline;
    padding: 0 20px;

    .title {
      position: relative;
      font-size: 24px;
      margin-right: 15px;
    }

    .breadcrumbs {
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          font-size: 12px;

          &:not(:last-child)::after {
            content: "›";
            margin: 0 10px;
          }
        }

        .link {
          text-decoration: none;
          color: $subtext-color;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .controlls {
    position: relative;
    padding: 0 20px;
  }
}
</style>
