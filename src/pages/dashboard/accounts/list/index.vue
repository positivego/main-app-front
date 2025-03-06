<script setup lang="ts">
import { UsersList } from "@/entities/dashboard/accounts/list/ui";
import { CButton } from "@/shared/components";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";

const test = () => {
  console.log(1);
};
</script>

<template>
  <PageHeaderWidget title="Пользователи">
    <template v-slot:controlls>
      <CButton @click="test"> Добавить </CButton>
    </template>
  </PageHeaderWidget>
  <UsersList />
</template>
