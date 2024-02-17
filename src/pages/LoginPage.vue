

<template>
    <div class="login-page">
        <q-page-container>
            <q-card class="login-card">
                <q-form @submit.prevent="handleClickLogin" @reset="handleClickReset">
                    <q-card-section>
                        <p class="text-h6 text-center">Login</p>
                    </q-card-section>

                    <q-card-section>
                        <q-input :rules="[(val, rules) => rules.email(val) || 'Please enter a valid email address']"
                            outlined v-model="email" label="Email" type="email" dense />
                    </q-card-section>

                    <q-card-section>
                        <q-input :rules="[val => val && val.length >= 6 || 'Password must be at least 6 characters']"
                            outlined v-model="password" label="Password" type="password" dense />
                    </q-card-section>

                    <q-card-actions align="center">
                        <q-btn type="submit" label="Login" color="primary" />
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-page-container>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const $q = useQuasar();
const router = useRouter();
const email = ref('');
const password = ref('');

const handleClickLogin = async () => {
    $q.loading.show();
    const { success, error } = await authStore.login(email.value, password.value);
    if (success) {
        router.push('/');
    } else {
        $q.notify({
            color: 'negative',
            position: 'bottom',
            message: error,
        });
    }
    $q.loading.hide();
};

const handleClickReset = () => {
    email.value = '';
    password.value = '';
};
</script>
  
<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    max-width: 400px;
    width: 100%;
    padding: 20px;
}
</style>
  