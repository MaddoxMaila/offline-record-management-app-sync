<script setup lang="ts">
import { useRoute } from 'vue-router';
import AuthForm from './AuthForm.vue';
import { useAuthStore } from '../../stores/auth.store';
import router from '../../router';

const route = useRoute()
const authStore = useAuthStore()

if(authStore.auth.isLogged){
    router.push({name: 'Home'})
}

</script>

<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <div class="col-4"></div>
        <div class="col-4 q-pt-xl">
            <QCard class="my-card bg-grey-2">
                <QCardSection>
                    <div class="text-h6">Record Management</div>
                </QCardSection>

                <QCardSection>
                    <AuthForm :type="route.name"/>
                </QCardSection>

                <QSeparator dark />

                <QCardActions>
                    <QBtn flat>
                        {{ route.name == 'Login' ? 'Create Account' : 'Have Acc? Login' }}
                    </QBtn>
                </QCardActions>
            </QCard>
        </div>
        <div class="col-4"></div>
    </div>
</template>