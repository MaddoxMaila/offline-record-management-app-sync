<script lang="ts">
import { defineProps, ref } from 'vue';
import { AuthForm } from '../../interfaces/auth-form.interface';
import { useAuthStore } from '../../stores/auth.store';
export default {

  setup(){

    const authStore = useAuthStore()

    const props = defineProps({
      type: {
        type: String,
        required: true,  // Make it required
      }
    })
    const formData = ref({email: "", password: ""} as AuthForm)
    const submitForm = () => {

      // props.type == 'Login' ? authStore.login(formData.value) : authStore.register(formData.value)
      authStore.login(formData.value)

    }

    return {
      authStore,
      formData,
      submitForm,
      props
    }

  }

}

</script>

<template>
  <QForm
      @submit="submitForm"
      class="q-gutter-md"
    >
      <QInput
        filled
        type="text"
        v-model="formData.email"
        label="Email"
        lazy-rules
        :error="authStore.error"
        :errorMessage="authStore.errorMessage"
        :rules="[ (v: String) => v && v.length > 0 || 'Please type something']"
      />

      <QInput
        filled
        type="password"
        v-model="formData.password"
        label="Password"
        lazy-rules
        :rules="[
          (v: String) => v !== null && v !== '' || 'Please type your age',
          (v: String) => v.length > 0 && v.length < 8 || 'Please type a valid password, must be atleast 8 characters'
        ]"
      />

      <div>
        <QBtn label="Submit" type="submit" color="primary"/>
      </div>
    </QForm>

</template>