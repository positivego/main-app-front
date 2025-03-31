<script setup lang="ts">
import { computed, onMounted, ref, watch, type PropType } from "vue";
import { CDropdown } from "../dropdown";
import type { DropdownItem } from "../dropdown/ui.vue";
import { displayItemsLimits } from "./constants";

type displayItemsLimit = {
  value: number;
  label: string;
};

const props = defineProps({
  pageCount: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  range: {
    type: Number,
    default: 5,
  },
  limit: {
    type: Number,
    default: displayItemsLimits[1].value,
  },
  displayItemsLimits: {
    type: Array as PropType<displayItemsLimit[]>,
    default: (): displayItemsLimit[] => displayItemsLimits,
  },
});

const emit = defineEmits(["onPrevPage", "onNextPage", "onSelectPage", "onChangeLimit"]);
const countItemsRef = ref<DropdownItem[]>([]);
const pages = ref<number[]>([]);

const getDropdownItems = computed((): DropdownItem[] => {
  return props?.displayItemsLimits?.map((el) => {
    return {
      id: el.value,
      label: el.label,
      value: el.value,
    };
  });
});

const notEnoughItems = computed(() => {
  if (props?.range >= props.pageCount) return true;
  return false;
});

const isStartRange = computed(() => {
  if (notEnoughItems.value) return false;
  return props.currentPage < props.range;
});

const isEndRange = computed(() => {
  if (notEnoughItems.value) return false;
  return props.currentPage > props.pageCount - props.range + 1;
});

const isMiddleRange = computed(() => {
  if (notEnoughItems.value) return false;
  return props.currentPage >= props.range && props.currentPage <= props.pageCount - props.range + 1;
});

const getRangePages = computed(() => {
  let from = 0;
  let to = props.pageCount;
  const step = Math.floor(props.range / 2);

  if (isStartRange.value) to = props.range;
  if (isEndRange.value) from = props.pageCount - props.range;
  if (isMiddleRange.value) {
    from = props.currentPage - step - 1;
    to = props.currentPage + step;
  }

  return pages.value.slice(from, to);
});

const showFirstPage = computed(() => {
  return isMiddleRange.value || isEndRange.value;
});

const showLastPage = computed(() => {
  return isMiddleRange.value || isStartRange.value;
});

const selectLimit = (countItem: DropdownItem[]) => {
  emit("onChangeLimit", countItem[0]?.value);
};

const setPages = () => {
  pages.value = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pages.value.push(i);
  }
};

watch(
  () => props.pageCount,
  () => {
    setPages();
  }
);

onMounted(() => {
  countItemsRef.value = [getDropdownItems.value?.filter((el) => el.value == props.limit)[0]];
  setPages();
});
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.controlls">
      <div :class="$style.buttons">
        <div :class="[$style.arrow, $style.arrow__left]" @click="emit('onPrevPage')">
          <svg>
            <use xlink:href="#common-arrow-left"></use>
          </svg>
        </div>
        <div :class="[$style.arrow, $style.arrow__right]" @click="emit('onNextPage')">
          <svg>
            <use xlink:href="#common-arrow-right"></use>
          </svg>
        </div>
      </div>

      <div :class="$style.pages">
        <div :class="$style.page" v-if="showFirstPage">
          <div :class="$style.page__button" @click="emit('onSelectPage', pages[0])">{{ pages[0] }}</div>
          <div :class="$style.dots">...</div>
        </div>

        <div
          :class="[$style.page, { [$style.page__active]: page === props.currentPage }]"
          v-for="(page, index) in getRangePages"
          :key="index"
        >
          <div :class="$style.page__button" @click="emit('onSelectPage', page)">{{ page }}</div>
        </div>

        <div :class="$style.page" v-if="showLastPage">
          <div :class="$style.dots">...</div>
          <div :class="$style.page__button" @click="emit('onSelectPage', pages[pages.length - 1])">
            {{ pages[pages.length - 1] }}
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.itemsCount">
      <div :class="$style.title">Всего элементов:</div>
      <CDropdown
        :items="getDropdownItems"
        v-model="countItemsRef"
        @update:model-value="selectLimit"
        :clearable="false"
        open-up
      />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  width: 100%;
  padding: 30px 0 20px 0;
  display: flex;
  justify-content: space-between;

  .controlls {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 20px;

    .buttons {
      position: relative;
      display: flex;
      margin-right: 10px;

      .arrow {
        position: relative;
        color: #c6c6c6;

        svg {
          position: relative;
          width: 20px;
          height: 20px;
          cursor: pointer;

          &:hover {
            color: $subtext-color-active;
          }
        }
      }
    }

    .pages {
      position: relative;
      display: flex;

      .page {
        position: relative;
        display: flex;
        align-items: baseline;
        color: #c6c6c6;

        .dots {
          position: relative;
          padding: 0 3px;
        }

        &__button {
          position: relative;
          padding: 3px 7px;
          cursor: pointer;
          border-radius: 3px;
          border: 1px solid transparent;

          &:hover {
            border: 1px solid $border-color;
            box-shadow: 0px 0px 3px black;
          }
        }

        &__active {
          color: $subtext-color-active;
        }
      }
    }
  }

  .itemsCount {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 20px;

    .title {
      position: relative;
      cursor: default;
      color: #c6c6c6;
      margin-right: 7px;
    }
  }
}
</style>
