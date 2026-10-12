<template>
  <p
    class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500"
    :class="{
      'text-primary': accountType === AccountType.INDIVIDUAL,
      'text-success-500': accountType === AccountType.TRADER,
      'text-rose-600': accountType === AccountType.ADMIN
    }"
  >
    {{ computedAccountType }}
  </p>
</template>

<script setup lang="ts">
import { AccountType } from '~/types/enums'

const props = defineProps<{ accountType?: AccountType }>()

const computedAccountType = computed(() => {
  if (props.accountType === AccountType.ADMIN) return 'Admin Account'
  else if (props.accountType === AccountType.TRADER) return 'Trade Customer'
  return 'Retail Customer'
})
</script>

<style scoped></style>
