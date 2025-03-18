<script setup lang="ts">
import { useAppStore } from "@/shared/app";
import { CPagination, CTable } from "@/shared/components";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import dayjs from "dayjs";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAccountsListStore } from "../model";

const router = useRouter();
const appStore = useAppStore();
const accountsListStore = useAccountsListStore();

const columns = [
  { key: "username", label: "Пользователь" },
  { key: "email", label: "Email" },
  { key: "role", label: "Статус" },
  { key: "createdAt", label: "Создан" },
];

const selectAccount = (accountId: number) => {
  return router.push({ name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.EDIT, params: { id: accountId } });
};

onMounted(() => {
  accountsListStore.get();
});
</script>

<template>
  <CTable :columns="columns" :rows="accountsListStore.accounts" :is-loading="accountsListStore.isLoading">
    <template #username="{ row }">
      <div :class="$style.itemUsername">
        <div :class="$style.username" @click="selectAccount(row.id)">{{ row.username }}</div>
        <div :class="$style.id">id: {{ row.id }}</div>
      </div>
    </template>

    <template #role="{ row }">
      <div :class="$style.itemRole">
        <div :class="$style.roleName">{{ appStore.getRoleName(row.roleId) }}</div>
        <div :class="[$style.status, { [$style.banned]: row.isBanned }]"></div>
      </div>
    </template>

    <template #createdAt="{ row }">
      {{ dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
  </CTable>
  <CPagination
    :page-count="accountsListStore.pagination.pageCount"
    :current-page="accountsListStore.pagination.page"
    :limit="accountsListStore.pagination.limit"
    @on-prev-page="accountsListStore.onSelectPrevPage"
    @on-next-page="accountsListStore.onSelectNextPage"
    @on-select-page="accountsListStore.onSelectPage"
    @on-change-limit="accountsListStore.onChangeLimit"
  />
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
