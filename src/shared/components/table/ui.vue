<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import { CSpinner } from "../spinner";

export type CTableColumn = {
  key: string;
  label: string;
};
type Row = Record<string, any>;

const props = defineProps({
  columns: {
    default: [],
    type: Array as PropType<CTableColumn[]>,
  },
  rows: {
    default: [],
    type: Array as PropType<Row[]>,
  },
  isLoading: {
    default: false,
    type: Boolean,
  },
});
</script>

<template>
  <div :class="$style.root">
    <table>
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="props?.rows?.length">
        <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
          <td v-for="column in columns" :key="column.key">
            <div :class="$style.item">
              <slot v-if="!props.isLoading" :name="column.key" :row="row">{{ row[column.key] }}</slot>
              <div v-else :class="$style.loading"></div>
            </div>
          </td>
        </tr>
      </tbody>

      <tbody v-if="props?.isLoading && !props?.rows?.length">
        <tr>
          <td :colspan="props.columns.length" :class="$style.spinnerContainer">
            <CSpinner />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module lang="scss">
.root {
  overflow-x: auto;
  position: relative;
  margin: 0 20px;
  box-shadow: 0px 0px 5px black;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid $border-color;
  border-radius: 6px;
}

thead {
  color: white;
}

thead th {
  padding: 12px;
  text-align: left;
  border: 1px solid $border-color;
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: $body-color-active;
}

td {
  color: #bcbcbc;
  border: 1px solid $border-color;

  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0 0 12px;
    min-height: 60px;
    font-size: 13px;
  }
}

.spinnerContainer {
  padding: 40px 0 30px 0;
  text-align: center;
}

.loading {
  background-color: $border-color;
  height: 10px;
  width: 100px;
  border-radius: 3px;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-color: $border-color;
  }
  50% {
    background-color: $border-color-active;
  }
  100% {
    background-color: $border-color;
  }
}
</style>
