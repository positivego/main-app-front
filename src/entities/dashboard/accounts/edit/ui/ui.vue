<script setup lang="ts">
import { useAppStore } from "@/shared/app";
import { CCheckbox } from "@/shared/components";
import { AccountRoleEnum } from "@/shared/constants/roles.constants";
import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAccountsEditStore } from "../model";

const router = useRouter();
const route = useRoute();

const appStore = useAppStore();
const accountsEditStore = useAccountsEditStore();

const { accountCopy } = storeToRefs(accountsEditStore);

const canChangePermissions = computed(() => {
  if (!accountCopy.value) return false;
  if (accountCopy?.value?.roleId === AccountRoleEnum.superAdmin) return true;
  if (accountCopy?.value?.roleId === AccountRoleEnum.admin) return true;
  if (accountCopy?.value?.roleId === AccountRoleEnum.moderator) return true;
  return false;
});

onMounted(() => {
  const accountId = route?.params?.id ?? null;
  if (accountId) accountsEditStore.init(+accountId);
  else router.push({ name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.LIST });
});
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.main">
      <div :class="$style.title">
        <div :class="$style.name">
          <div :class="[$style.status, { [$style.banned]: accountCopy?.isBanned }]"></div>
          <div :class="$style.username">{{ accountCopy?.username ?? "" }}</div>
          <div :class="$style.role">{{ appStore.getRoleName(accountCopy?.roleId ?? 0) }}</div>
          <div :class="$style.id">{{ accountCopy?.id ?? "" }}</div>
        </div>
        <div :class="$style.email">{{ accountCopy?.email }}</div>
      </div>
      <div :class="$style.createDate">{{ dayjs(accountCopy?.createdAt).format("YYYY-MM-DD HH:mm:ss") }}</div>
    </div>

    <div :class="$style.permissions" v-if="canChangePermissions">
      <div :class="$style.content">
        <div :class="$style.title">Аккаунты</div>
        <div :class="$style.items">
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.users.edit" direction="right"> Редактирование </CCheckbox>
          </div>
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.users.delete" direction="right"> Удаление </CCheckbox>
          </div>
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.users.muted" direction="right"> Заглушить </CCheckbox>
          </div>
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.users.banned" direction="right">
              Выдавать баны хе хе
            </CCheckbox>
          </div>
        </div>
      </div>

      <div :class="$style.content">
        <div :class="$style.title">Moviester</div>
        <div :class="$style.subtitle">Кино</div>
        <div :class="$style.items">
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.moviester.movies.apped" direction="right">
              Добавление
            </CCheckbox>
          </div>
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.moviester.movies.edit" direction="right">
              Редактирование
            </CCheckbox>
          </div>
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.moviester.movies.delete" direction="right">Удаление</CCheckbox>
          </div>
        </div>
        <div :class="$style.subtitle">Комментарии</div>
        <div :class="$style.items">
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.moviester.comments.edit" direction="right">
              Редактирование
            </CCheckbox>
          </div>
          <div :class="$style.item">
            <CCheckbox v-model="accountCopy!.permissions.moviester.comments.delete" direction="right">
              Удаление
            </CCheckbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  margin: 0 20px;

  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 5px 0;
    margin-bottom: 40px;

    .title {
      position: relative;
      display: flex;
      flex-direction: column;

      .name {
        position: relative;
        display: flex;
        align-items: baseline;

        .status {
          position: relative;
          width: 15px;
          height: 15px;
          border-radius: 100%;
          background-color: $user-status-valid;
          margin-right: 10px;
        }

        .banned {
          background-color: $user-status-banned;
        }

        .username {
          position: relative;
          font-size: 24px;
        }

        .role,
        .id {
          position: relative;
          color: $subtext-color;
          font-size: 12px;
          padding-left: 7px;
        }
      }

      .email {
        position: relative;
        color: $subtext-color;
        font-size: 14px;
        padding-top: 7px;
      }
    }

    .createDate {
      position: relative;
      color: $subtext-color;
      font-size: 12px;
    }
  }

  .permissions {
    position: relative;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      .title {
        position: relative;
        font-size: 18px;
      }

      .subtitle {
        position: relative;
        font-size: 16px;
        color: $subtext-color;
        padding-top: 20px;
      }

      .items {
        position: relative;
        display: flex;
        padding-top: 15px;

        .item {
          position: relative;
          display: flex;
          align-items: center;
          width: 170px;

          span {
            position: relative;
            color: $subtext-color;
            font-size: 12px;
            margin-right: 7px;
          }
        }
      }
    }
  }
}
</style>
