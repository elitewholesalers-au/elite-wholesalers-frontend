<template>
  <div class="min-h-dvh w-full flex flex-col">
    <BaseGlobalInfo />
    <BaseHeader class="w-full" />
    <main class="flex-1">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const productStore = useProductStore()

onBeforeMount(async () => {
  productStore.getProductCategories()
  productStore.getFeaturedProducts()
})
</script>

<style scoped></style>
