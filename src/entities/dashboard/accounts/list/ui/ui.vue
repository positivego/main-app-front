<script setup lang="ts">
import { useAppStore } from "@/shared/app";
import { CTable } from "@/shared/components";
import { CDropdown } from "@/shared/components/dropdown";
import dayjs from "dayjs";
import { computed, onMounted } from "vue";
import { useAccountsListStore } from "../model";

const appStore = useAppStore();
const accountsListStore = useAccountsListStore();

const columns = [
  { key: "username", label: "Пользователь" },
  { key: "email", label: "Email" },
  { key: "role", label: "Статус" },
  { key: "createdAt", label: "Создан" },
];

const getRoleName = computed(() => {
  return (roleId: number): string => {
    const role = appStore.roles.find((el) => el.id == roleId);
    if (role) return role.name["ru"];
    return "Не определено";
  };
});

const test = [
  {
    id: 1,
    label: "asd123123123123123123",
  },
  {
    id: 2,
    label: "123",
  },
  {
    id: 3,
    label: "ccc",
  },
  {
    id: 4,
    label: "asd123123123123123123",
  },
  {
    id: 5,
    label: "123",
  },
  {
    id: 6,
    label: "ccc",
  },
  {
    id: 7,
    label: "asd123123123123123123",
  },
  {
    id: 8,
    label: "123",
  },
  {
    id: 9,
    label: "ccc",
  },
  {
    id: 10,
    label: "asd123123123123123123",
  },
  {
    id: 11,
    label: "123",
  },
  {
    id: 12,
    label: "ccc",
  },
  {
    id: 13,
    label: "asd123123123123123123",
  },
  {
    id: 14,
    label: "123",
  },
  {
    id: 15,
    label: "ccc",
  },
];

const handleSelection = (e: any) => {
  console.log({ e });
};

onMounted(() => {
  accountsListStore.get();
});
</script>

<template>
  <CTable :columns="columns" :rows="accountsListStore.accounts" :is-loading="accountsListStore.isLoading">
    <template #username="{ row }">
      <div :class="$style.itemUsername">
        <div :class="$style.username">{{ row.username }}</div>
        <div :class="$style.id">id: {{ row.id }}</div>
      </div>
    </template>

    <template #role="{ row }">
      <div :class="$style.itemRole">
        <div :class="$style.roleName">{{ getRoleName(row.roleId) }}</div>
        <div :class="[$style.status, { [$style.banned]: row.isBanned }]"></div>
      </div>
    </template>

    <template #createdAt="{ row }">
      {{ dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
  </CTable>
  <CDropdown multiple :items="test" @update:selected="handleSelection" />
</template>

<style module lang="scss">
.itemUsername {
  position: relative;
  display: flex;
  flex-direction: column;

  .username {
    position: relative;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: $border-color-active;
      text-decoration: underline;
    }
  }

  .id {
    padding-top: 6px;
    font-size: 12px;
    opacity: 0.4;
  }
}

.itemRole {
  position: relative;
  display: flex;
  align-items: center;

  .roleName {
    position: relative;
    margin-right: 10px;
  }

  .status {
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: $user-status-valid;
  }

  .banned {
    background-color: $user-status-banned;
  }
}
</style>
