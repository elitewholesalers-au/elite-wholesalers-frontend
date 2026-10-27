<template>
  <UContainer class="mx-auto px-5 py-10 sm:px-8 lg:py-14">
    <div class="border-b border-neutral-200 mb-10">
      <div class="flex flex-col justify-between gap-6 pb-7 sm:flex-row sm:items-end">
        <div>
          <p class="text-xs font-bold tracking-[0.18em] text-muted uppercase">
            <UBreadcrumb
              :items="categoryParentsBreadcrumb"
              class="mb-2 text-xs"
              :ui="{ link: 'text-xxs! md:text-base' }"
            />
          </p>
          <h1
            class="mt-4 font-oswald text-[clamp(1.5rem,5vw,2.4rem)] font-medium text-neutral-950 sm:text-5xl"
          >
            {{ selectedCategory?.name }}
          </h1>
        </div>
        <div
          class="space-x-4 lg:space-y-4 flex-row-reverse flex md:block justify-between items-center"
        >
          <USelectMenu
            icon="i-lucide-sliders-horizontal"
            :search-input="false"
            size="sm"
            arrow
            :items="filterQuery"
            value-key="value"
            v-model="categoryProductQuery"
            @update:model-value="(val) => productStore.getProductByCategoryId(categoryId)"
            class="w-36"
            :ui="{
              base: 'text-xs!',
              itemLabel: 'text-xs!'
            }"
          />
          <p
            v-if="categoryProducts.length > 0"
            class="text-xs md:text-sm text-neutral-500 flex items-center font-semibold"
            aria-live="polite"
          >
            ({{ categoryProducts.length }}) Products available
          </p>
        </div>
      </div>
    </div>

    <div class="w-full" v-if="categoryProducts.length > 0">
      <div class="product-list gap-4">
        <BaseProductCard
          v-for="product in categoryProducts"
          :key="product.item_id"
          :product="product"
        />
      </div>
    </div>
    <div v-else class="py-20 text-center flex flex-col justify-center">
      <NuxtImg src="/images/empty-data.svg" alt="empty product" class="mx-auto max-h-60" />
      <h2 class="mt-5 font-oswald text-3xl text-neutral-900">No product in this category</h2>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { RouteName } from '~/constants/route-names'
import { useProductStore } from '~/store/product-store'

useSeoMeta({ title: 'Products', description: 'Browse the Elite Wholesalers product collection.' })
definePageMeta({
  name: RouteName.CategoryProducts
})

const route = useRoute()
const productStore = useProductStore()
const { selectedCategory, categoryProducts, categoryProductQuery } = storeToRefs(productStore)

const categoryId = computed(() => route.params.categoryId as string)

const filterQuery = ref([
  {
    label: 'Popularity',
    value: { sort_column: 'purchase_rate', sort_order: 'D' }
  },
  {
    label: 'Most recent',
    value: { sort_column: 'created_time', sort_order: 'D' }
  },
  {
    label: 'Price: High to Low',
    value: { sort_column: 'rate', sort_order: 'D' }
  },
  {
    label: 'Price: Low to High',
    value: { sort_column: 'rate', sort_order: 'A' }
  },
  {
    label: 'Name: A-Z',
    value: { sort_column: 'name', sort_order: 'A' }
  },
  {
    label: 'Name: Z-A',
    value: { sort_column: 'name', sort_order: 'D' }
  }
])

const selectedQuery = ref(filterQuery.value[0])

const categoryParentsBreadcrumb = computed(() => {
  const base = [
    {
      to: '/#products',
      label: 'Products',
      onSelect: () => null
    }
  ]

  const currentCategory = selectedCategory.value

  // 1. Combine ancestors and current category into one raw array
  const rawCategories = [
    ...(currentCategory?.ancestors ?? []),
    ...(currentCategory ? [currentCategory] : [])
  ]

  // 2. Filter out duplicates based on category_id
  const seenIds = new Set<string>()
  const uniqueCategories = rawCategories.filter((cat) => {
    if (seenIds.has(cat.category_id)) return false
    seenIds.add(cat.category_id)
    return true
  })

  // 3. Map to breadcrumb item structure
  const categoryBreadcrumbs = uniqueCategories.map((cat) => ({
    to: {
      name: RouteName.Categories,
      params: { categoryId: cat.category_id }
    },
    label: cat.name,
    onSelect: () => productStore.selectCategory(cat.category_id)
  }))

  return [...base, ...categoryBreadcrumbs]
})

onMounted(() => {
  productStore.getProductByCategoryId(route.params.categoryId as string)
})
</script>
