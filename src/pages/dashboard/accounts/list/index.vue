<script setup lang="ts">
import { UsersList } from "@/entities/dashboard/accounts/list/ui";
import { PageHeaderWidget } from "@/widgets/dashboard/page-header";
</script>

<template>
  <PageHeaderWidget title="Пользователи"> </PageHeaderWidget>
  <UsersList />
</template>
