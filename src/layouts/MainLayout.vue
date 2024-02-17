<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Simularge Case
        </q-toolbar-title>

        <q-space />

        <q-btn flat dense icon="logout" label="Logout" no-caps @click="handleClickLogout" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';

const authStore = useAuthStore();

const $q = useQuasar();
const router = useRouter();

const handleClickLogout = async () => {
  $q.loading.show();
  const { success, error } = await authStore.logout();
  if (success) {
    router.push('/login');
  } else {
    $q.notify({
      color: 'negative',
      position: 'bottom',
      message: error,
    });
  }
  $q.loading.hide();
};
</script>
