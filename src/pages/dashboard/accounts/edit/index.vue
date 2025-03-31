<script setup lang="ts">
import { AccountEdit } from "@/entities/dashboard";
import { useAccountsEditStore } from "@/entities/dashboard/accounts/edit/model";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";

const accountsEditStore = useAccountsEditStore();
</script>

<template>
  <PageHeaderWidget title="Пользователи">
    <template v-slot:controlls>
      <CButton
        :disabled="!accountsEditStore.isAccountChange"
        :loading="accountsEditStore.isUpdated"
        @click="accountsEditStore.update"
      >
        Обновить
      </CButton>
    </template>
  </PageHeaderWidget>
  <AccountEdit />
</template>
