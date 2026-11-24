
<template>
  <section
    aria-label="Elite Wholesalers Weekly Deal"
    class="bg-white py-4 md:py-8"
  >
    <UContainer class="mx-auto px-4 lg:px-6">
      <NuxtLink
        :to="deal.url"
        class="block overflow-hidden rounded-xl"
        :aria-label="`Shop ${deal.title} - ${deal.discount} off`"
      >
        <img
          :src="deal.image"
          :alt="`${deal.title} - ${deal.discount} off the entire range`"
          class="block h-auto w-full"
          width="2172"
          height="724"
          loading="lazy"
        />
      </NuxtLink>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const deal = {
  title: 'EliteAlarms',
  discount: '20%',
  code: 'WEEKLY20',
  image: '/promotions/elite-alarms-weekly20.png',
  url: '/categories/1969240000038681006/products'
}
</script>
