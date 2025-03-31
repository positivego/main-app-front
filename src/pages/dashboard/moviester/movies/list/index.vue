<script setup lang="ts">
import { CDropdown } from "@/shared/components";
import type { DropdownItem } from "@/shared/components/dropdown/ui.vue";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
import { ref } from "vue";

const refr = ref([]);

const test: DropdownItem[] = [
  {
    id: 1,
    label: "Nfr",
  },
  {
    id: 2,
    label: "так",
  },
  {
    id: 3,
    label: "Hfp",
  },
  {
    id: 4,
    label: "ывыв",
  },
  {
    id: 5,
    label: "Nfr",
  },
  {
    id: 6,
    label: "так",
  },
  {
    id: 7,
    label: "Hfp",
  },
  {
    id: 8,
    label: "ывыв",
  },
  {
    id: 9,
    label: "Nfr",
  },
  {
    id: 10,
    label: "так",
  },
  {
    id: 11,
    label: "Hfp",
  },
  {
    id: 12,
    label: "ывыв",
  },
  {
    id: 13,
    label: "Nfr",
  },
  {
    id: 14,
    label: "так",
  },
  {
    id: 15,
    label: "Hfp",
  },
  {
    id: 16,
    label: "ывыв",
  },
  {
    id: 17,
    label: "Nfr",
  },
  {
    id: 18,
    label: "так",
  },
  {
    id: 19,
    label: "Hfp",
  },
  {
    id: 20,
    label: "ывыв",
  },
  {
    id: 21,
    label: "Nfr",
  },
  {
    id: 22,
    label: "так",
  },
  {
    id: 23,
    label: "Hfp",
  },
  {
    id: 24,
    label: "ывыв",
  },
  {
    id: 25,
    label: "Nfr",
  },
  {
    id: 26,
    label: "так",
  },
  {
    id: 27,
    label: "Hfp",
  },
  {
    id: 28,
    label: "ывыв",
  },
];
</script>

<template>
  <PageHeaderWidget title="Кино"> </PageHeaderWidget>
  {{ refr }}
  <CDropdown v-model="refr" :items="test" searchable />
</template>
