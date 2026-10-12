<template>
  <div class="">
    <HomeHero />

    <div class="">
      <div class="bg-white py-8">
        <UContainer class="mx-auto px-4 lg:px-6">
          <HomePartnerNetwork />
        </UContainer>
      </div>
      <HomeCategoryGrid id="products" />
      <div class="bg-white py-8">
        <UContainer class="mx-auto px-4 lg:px-6">
          <HomeTrendingProducts />
          <BaseYoutubePlayer />
        </UContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'

definePageMeta({
  title: 'Home Page',
  name: RouteName.Home
})

useHead({
  title: 'Home Page'
})

useSeoMeta({
  title: 'Home Page'
})
</script>
