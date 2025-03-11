<script setup lang="ts">
import { defineEmits, defineProps, onMounted, onUnmounted, type PropType, ref, useCssModule } from "vue";

type Item = {
  id: number | string;
  label: string;
};

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const style = useCssModule();

const emit = defineEmits(["update:selected"]);
const selectedItems = ref<Item[]>([]);
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = (e: MouseEvent) => {
  const target = e?.target as HTMLDivElement;
  if (target?.classList?.contains(style.clear)) {
    return (isOpen.value = false);
  }
  isOpen.value = !isOpen.value;
};

const selectItem = (item: Item) => {
  if (props.multiple) {
    const index = selectedItems.value.findIndex((selected) => selected.id === item.id);
    if (index === -1) selectedItems.value.push(item);
    else selectedItems.value.splice(index, 1);
    emit(
      "update:selected",
      selectedItems.value.map((el) => el.id)
    );
  } else {
    selectedItems.value = [item];
    emit("update:selected", selectedItems.value[0].id);
    isOpen.value = false;
  }
};

const removeItem = () => {
  if (props.multiple) {
  } else {
    selectedItems.value = [];
    emit("update:selected", null);
    isOpen.value = false;
  }
};

const isSelected = (item: Item) => {
  return selectedItems.value.some((selected) => selected.id === item.id);
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
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
        <div :class="$style.label">{{ selectedItems[0]?.label || "Выберите..." }}</div>
        <div :class="$style.clear" @click.self="removeItem">×</div>
      </div>
      <div :class="$style.tags" v-else>
        <div :class="$style.title" v-if="!selectedItems?.length"><span>Выберите...</span></div>
        <div :class="$style.tag" v-else v-for="item in selectedItems" :key="item.id">{{ item.label }}</div>
      </div>
    </div>

    <div v-if="isOpen" :class="$style.menu">
      <div
        v-for="item in items"
        :key="item.id"
        :class="[$style.item, isSelected(item) ? $style.selected : '']"
        @click="selectItem(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.dropdown {
  position: relative;
  display: flex;
  user-select: none;
}

.trigger {
  position: relative;
  display: flex;
  padding: 10px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  color: #c6c6c6;
  border: 1px solid $border-color;
  transition: 0.3s;
  box-shadow: 0px 0px 3px black;
  min-width: 70px;
  max-width: 250px;
  overflow: hidden;

  .title {
    position: relative;
    display: flex;
    width: 100%;
    align-items: baseline;
    justify-content: space-between;

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
  }

  .tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .tag {
      position: relative;
      cursor: pointer;
      color: #c6c6c6;
      border: 1px solid $border-color;
      font-size: 12px;
      padding: 3px 7px;
      border-radius: 3px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }

  &:hover {
    border: 1px solid $border-color-active;
    box-shadow: 0px 0px 3px $border-color-active;
  }
}

.menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
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

  .selected {
    background: $item-active-smooth !important;
    color: white;
  }
}
</style>
