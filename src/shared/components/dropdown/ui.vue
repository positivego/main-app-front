<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useCssModule,
  type PropType,
} from "vue";

export type DropdownItem = {
  id: number | string;
  label: string;
  value?: any;
};

const props = defineProps({
  items: {
    type: Array as PropType<DropdownItem[]>,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  openUp: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue"]);
const style = useCssModule();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const input = ref<string>("");

const currentItems = computed(() => {
  if (props.searchable && input.value?.length) {
    return props.items.filter((el) => el.label.includes(input.value)).slice(0, 50);
  } else return props.items.slice(0, 50);
});

const selectedItems = computed<DropdownItem[]>(() => {
  const value = props.modelValue;
  const values = Array.isArray(value) ? value : value !== undefined ? [value] : [];

  return props.items.filter((item) => values.includes(item.id));
});

const toggleDropdown = async (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target?.classList?.contains(style.searchInput)) return;
  if (target?.classList?.contains(style.clear)) return (isOpen.value = false);

  isOpen.value = !isOpen.value;

  if (isOpen.value && props.searchable) {
    await nextTick();
    inputRef.value?.focus();
  }
};

const selectItem = (item: DropdownItem) => {
  const current = props.modelValue;

  if (props.multiple) {
    const values = Array.isArray(current) ? [...current] : [];
    const index = values.findIndex((val) => val === item.id);
    if (index === -1) values.push(item.id);
    else values.splice(index, 1);
    emit("update:modelValue", values);
  } else {
    emit("update:modelValue", item.id);
    isOpen.value = false;
  }
};

const removeItem = (id: number | string | undefined) => {
  const current = props.modelValue;
  if (props.multiple) {
    const values = Array.isArray(current) ? [...current] : [];
    const index = values.findIndex((val) => val === id);
    if (index !== -1) values.splice(index, 1);
    emit("update:modelValue", values);
  } else {
    emit("update:modelValue", undefined);
    isOpen.value = false;
  }
};

const isSelected = (item: DropdownItem) => {
  const value = props.modelValue;
  return Array.isArray(value) ? value.includes(item.id) : value === item.id;
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    const target = event.target as HTMLElement;

    if (target?.classList?.contains(style.label)) return;
    if (target?.classList?.contains(style.placeholder)) return;
    if (target?.classList?.contains(style.searchInput)) return;

    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div :class="$style.dropdown" ref="dropdownRef">
    <div :class="$style.trigger" @click="toggleDropdown">
      <div :class="$style.title" v-if="!props.multiple">
        <div v-if="(props.searchable && !isOpen) || !props.searchable" :class="$style.label">
          {{ selectedItems[0]?.label || "Выберите..." }}
        </div>
        <div v-if="props.searchable && isOpen" :class="$style.input">
          <input type="text" v-model="input" ref="inputRef" placeholder="Поиск" :class="$style.searchInput" />
        </div>
        <div v-if="props.clearable" :class="$style.clear" @click.self="removeItem(undefined)">×</div>
      </div>
      <div :class="$style.tags" v-else>
        <div
          :class="$style.title"
          v-if="!selectedItems?.length && ((props.searchable && !isOpen) || !props.searchable)"
        >
          <span :class="$style.placeholder">Выберите...</span>
        </div>
        <div :class="$style.tag" v-else v-for="item in selectedItems" :key="item.id">
          <span>{{ item.label }}</span>
          <div v-if="props.clearable" :class="$style.clear" @click.self="removeItem(+item.id)">×</div>
        </div>
        <div v-if="props.searchable && isOpen" :class="$style.input">
          <input type="text" v-model="input" ref="inputRef" placeholder="Поиск" :class="$style.searchInput" />
        </div>
      </div>
    </div>

    <div
      v-if="isOpen"
      :class="[$style.menu, { [$style.menuOpenDown]: !props.openUp }, { [$style.menuOpenUp]: props.openUp }]"
    >
      <div
        v-for="item in currentItems"
        :key="item.id"
        :class="[$style.item, isSelected(item) ? $style.selected : '']"
        @click="selectItem(item)"
      >
        {{ item.label }}
      </div>

      <div :class="$style.empty" v-if="!currentItems?.length">Нет элементов ...</div>
    </div>
  </div>
</template>

<style module lang="scss">
.placeholder {
  position: relative;
}

.searchInput {
  position: relative;
}

.dropdown {
  position: relative;
  display: flex;
  user-select: none;
  min-height: 40px;
}

.trigger {
  position: relative;
  display: flex;
  padding: 10px 0 0 10px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  color: #c6c6c6;
  border: 1px solid $border-color;
  transition: 0.3s;
  box-shadow: 0px 0px 3px black;
  width: 100%;
  min-width: 70px;
  overflow: hidden;

  .title {
    position: relative;
    display: flex;
    width: 100%;
    padding: 0 10px 10px 0;
    align-items: baseline;
    justify-content: space-between;
    align-items: center;

    .label {
      position: relative;
      display: flex;
      max-width: 230px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .clear {
      position: relative;
      padding-left: 20px;
      font-size: 15px;
      transition: 0.3s;

      &:hover {
        color: $border-color-active;
      }
    }

    .input {
      position: relative;
      width: 100px;

      input {
        position: relative;
        width: 100%;
        background-color: transparent;
        border: none;
        color: $subtext-color;
        outline: none;
      }
    }
  }

  .tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .tag {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #c6c6c6;
      border: 1px solid $border-color;
      font-size: 12px;
      padding: 3px 7px;
      border-radius: 3px;
      margin: 0 10px 10px 0;

      .clear {
        position: relative;
        padding-left: 10px;
        font-size: 15px;
        transition: 0.3s;

        &:hover {
          color: $border-color-active;
        }
      }
    }

    .input {
      position: relative;
      display: flex;
      align-items: center;
      width: 100px;
      margin: 0 10px 10px 0;

      input {
        position: relative;
        width: 100%;
        background-color: transparent;
        border: none;
        color: $subtext-color;
        outline: none;
      }
    }
  }

  &:hover {
    border: 1px solid $border-color-active;
    box-shadow: 0px 0px 3px $border-color-active;
  }
}

.menu {
  position: absolute;
  background-color: $body-color;
  display: flex;
  flex-direction: column;
  left: 0;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-size: 12px;
  cursor: pointer;
  color: #c6c6c6;
  border: 1px solid $border-color;
  overflow-y: scroll;
  max-height: 300px;

  .item {
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: $body-color-active;
    }
  }

  .empty {
    padding: 10px;
  }

  .selected {
    background: $item-active-smooth !important;
    color: white;
  }
}

.menuOpenDown {
  top: 100% !important;
}

.menuOpenUp {
  bottom: 100% !important;
}
</style>
