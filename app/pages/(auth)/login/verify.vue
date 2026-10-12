<template>
  <div class="mx-auto mt-10 flex w-full flex-col gap-8">
    <UPinInput
      v-model="state.otp"
      otp
      class=""
      placeholder="*"
      length="4"
      :ui="{
        base: 'size-8 text-xl rounded-lg'
      }"
      @change="validatePinComplete"
    />

    <UButton
      type="submit"
      class="disabled:bg-primary-200 flex items-center rounded-full!"
      block
      size="xl"
      label="Confirm code"
      font="font-bold"
      :loading="loading"
      :disabled="!isComplete"
      @click="verifyEmail"
    />
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useAuthStore } from '~/store/auth-store'

definePageMeta({
  name: RouteName.Auth.LoginVerify,
  layout: 'auth',
  pageTitle: 'Email Verification',
  pageLabel: 'ID Verification'
})

const authStore = useAuthStore()
const route = useRoute()
const loading = ref(false)
const state = ref<{ otp: string[] }>({
  otp: []
})

const isComplete = ref(false)

const validatePinComplete = () => {
  if (state.value.otp?.length === 4) {
    isComplete.value = true
  } else {
    isComplete.value = false
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyEmail = async () => {
  loading.value = true
  await authStore.verifyLoginOTP({
    email: route.query.email as string,
    verification_code: state.value.otp.join('')
  })
  loading.value = false
}

watchEffect(() => {
  route.meta.pageHint = `Enter the 4-digit code sent to your email address`
})

onMounted(async () => {
  // 1. Grab the raw browser search string directly
  const searchString = window.location.search
  const urlParams = new URLSearchParams(searchString)

  let email = urlParams.get('email') || ''
  const token = urlParams.get('token') || ''
  email = decodeURIComponent(email).replace(/ /g, '+')

  if (email && token) {
    loading.value = true
    state.value.otp = token.split('')

    try {
      await authStore.verifyLoginOTP({
        email,
        verification_code: token
      })
    } finally {
      loading.value = false
    }
  }
})
</script>

<style scoped></style>
