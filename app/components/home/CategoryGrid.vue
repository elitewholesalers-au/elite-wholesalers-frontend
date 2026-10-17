<template>
  <section class="mx-auto px-4 lg:px-6 mb-12 bg-primary py-20">
    <UContainer>
      <div class="mb-6 flex items-end justify-between">
        <div>
          <!-- <span class="text-xxs font-bold uppercase tracking-wider text-outline">
          Commercial Core
        </span> -->
          <h2
            class="text-[clamp(1.5rem,5vw,2.5rem)] font-poppins font-bold tracking-tight uppercase text-white"
          >
            Popular Categories
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UCard
          v-for="category in categories"
          :key="category.category_id"
          class="cursor-pointer"
          :ui="{
            root: 'overflow-hidden max-w-full min-w-0 lg:max-w-70 ring-transparent flex flex-col rounded-none! transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
            body: 'flex-1 flex flex-col justify-between px-3! py-0!!',
            header: 'p-0!',
            footer: 'p-0!'
          }"
          @click="productStore.selectCategory(category.category_id)"
        >
          <!-- Card Media Header -->
          <template #header>
            <div class="relative w-full overflow-hidden bg-gray-800">
              <img
                :src="category.image"
                :alt="category.name"
                class="w-full md:h-80 object-fill bg-left overflow-hidden object-top block transition-transform duration-300 hover:scale-102"
              />
            </div>
          </template>

          <template #footer>
            <button
              class="bg-secondary block w-full border-0 ring-0 text-sm uppercase text-center font-base py-2"
            >
              {{ category.name }}
            </button>
          </template>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/product-store'

const productStore = useProductStore()

const categories = ref([
  {
    name: 'CCTV',
    image: '/product-images/cctv.jpeg',
    category_id: '1969240000009043009',
    description: 'High-definition IP, analog, and PTZ surveillance cameras.'
  },
  {
    name: 'Alarms',
    image: '/product-images/alarms.jpeg',
    category_id: '1969240000009043011',
    description: 'Intrusion sensors, sirens, and multi-zone control panels.'
  },
  {
    name: 'Intercoms',
    image: '/product-images/intercoms.jpeg',
    category_id: '1969240000009043025',
    description: 'Two-way video doorbells and commercial IP stations.'
  },
  {
    name: 'Access Control',
    image: '/product-images/access-control.jpeg',
    category_id: '1969240000022731037',
    description: 'Biometric terminals, RFID card readers, and smart locks.'
  },
  {
    name: 'Network Devices',
    image: '/product-images/network-transmission.jpeg',
    category_id: '1969240000009043027',
    description: 'PoE switches, patch panels, routers, and fiber transceivers.'
  },
  {
    name: 'Automotive',
    image: '/product-images/automotives.jpeg',
    category_id: '1969240000024405845',
    description: 'GPS fleet tracking units and dual dash cameras.'
  },
  {
    name: 'Gun Locks',
    image: '/product-images/gun-locks.jpeg',
    category_id: '1969240000025170003',
    description: 'Trigger guards, biometric cable locks, and secure vaults.'
  },
  {
    name: 'Electrical & LED lighting',
    image: '/product-images/lighting-automation.jpeg',
    category_id: '1969240000009922011',
    description: 'Zigbee gateways, smart relays, and wireless environmental sensors.'
  }
])
</script>
