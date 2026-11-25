<template>
  <UContainer class="mx-auto px-5 py-10 lg:py-14">
    <div class="border-b border-neutral-200 pb-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-primary-500">Checkout</p>
      <h1 class="mt-2 font-oswald text-4xl font-medium text-neutral-950">Delivery details</h1>
    </div>

    <div v-if="cartItems.length === 0" class="py-20 text-center flex flex-col justify-center">
      <NuxtImg src="/images/empty-cart.svg" alt="empty cart" class="mx-auto max-h-60" />
      <h2 class="mt-5 font-oswald text-3xl text-neutral-900">Your cart is empty</h2>
      <p class="mt-2 text-sm text-neutral-500">Find something worth stocking up on.</p>
      <UButton
        label="Browse products"
        to="/products"
        class="mt-6 px-10! py-2! inline w-fit mx-auto"
        size="lg"
      />
    </div>
    <template v-else>
      <div class="checkout w-full mt-8 md:flex items-start gap-10 lg:gap-16">
        <section class="space-y-6 flex flex-col justify-start">
          <URadioGroup
            legend="Delivery Method"
            variant="card"
            class=""
            orientation="horizontal"
            size="sm"
            :ui="{
              item: 'md:w-[49%]'
            }"
            :items="deliveryMethods"
            v-model:model-value="selectedDeliveryMethod"
          />

          <p
            class="text-sm mb-1 leading-6 text-neutral-600"
            v-if="selectedDeliveryMethod === DeliveryMethod.SHIPPING"
          >
            Review your delivery details below.
          </p>
          <p
            class="text-sm mb-1 leading-6 text-neutral-600"
            v-else-if="selectedDeliveryMethod === DeliveryMethod.PICKUP"
          >
            Kindly pick up your order from our head office in the address below.
          </p>

          <!-- Missing Address Warning / Prompt -->
          <template v-if="selectedDeliveryMethod === DeliveryMethod.SHIPPING">
            <div
              v-if="!hasCompleteAddress"
              class="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900 space-y-3"
            >
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-alert-triangle"
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />
                <div class="text-sm">
                  <p class="font-semibold">Delivery address required</p>
                  <p class="mt-1 text-amber-800">
                    You must add a complete delivery address before you can proceed with checkout.
                  </p>
                </div>
              </div>
              <UButton
                label="Add delivery address"
                to="/dashboard/addresses"
                color="warning"
                variant="solid"
                size="md"
                block
                class="font-medium"
              />
            </div>

            <!-- Checkout Form / Address Card -->
            <div v-else class="space-y-4">
              <UCard :ui="{ body: 'sm:p-4', header: 'sm:py-2 bg-primary text-white font-oswald' }">
                <template #header>
                  <h3 class="text-sm font-semibold uppercase">Delivery Address</h3>
                </template>
                <address class="not-italic text-sm space-y-1">
                  <p class="font-medium text-neutral-950">{{ user?.location?.street }}</p>
                  <p class="text-neutral-600">
                    {{ user?.location?.city }}, {{ user?.location?.state }}
                    <span class="text-xs text-neutral-500">{{ user?.location?.postal_code }}</span>
                  </p>
                  <p class="text-neutral-600">{{ user?.location?.country }}</p>
                </address>
              </UCard>
            </div>
          </template>
          <template class="" v-else-if="selectedDeliveryMethod === DeliveryMethod.PICKUP">
            <div class="space-y-4">
              <UCard
                class=""
                :ui="{ body: 'sm:p-4', header: 'sm:py-2 bg-primary text-white font-oswald' }"
              >
                <template #header>
                  <h3 class="text-sm font-semibold uppercase">Pickup Address</h3>
                </template>
                <address class="not-italic text-sm space-y-1">
                  <p class="font-medium text-neutral-950">{{ pickupAddress?.street }}</p>
                  <p class="text-neutral-600">
                    {{ pickupAddress.city }}, {{ pickupAddress.state }}
                    <span class="text-xs text-neutral-500">{{ pickupAddress.postal_code }}</span>
                  </p>
                  <p class="text-neutral-600">{{ pickupAddress.country }}</p>
                </address>
              </UCard>
            </div>
          </template>

          <template class="" v-else>
            <div
              class="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900 space-y-3"
            >
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-alert-triangle"
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />
                <div class="text-sm">
                  <p class="font-semibold">Delivery method required</p>
                  <p class="mt-1 text-amber-800">
                    You must select a delivery method before you can proceed with checkout.
                  </p>
                </div>
              </div>
            </div>
          </template>

<!-- Promotional Code -->
<div class="rounded-xl border border-neutral-200 p-5 space-y-3">
  <label
    for="promo-code"
    class="block text-sm font-semibold text-neutral-900"
  >
    Promotional Code
  </label>

  <UInput
    id="promo-code"
    v-model="promoCode"
    placeholder="Enter promotional code"
    size="lg"
    class="w-full"
  />

  <p class="text-xs text-neutral-500">
    Enter WEEKLY20 to receive 20% off eligible Elite Alarms products.
  </p>
</div>
          <!-- Disabled Checkout Action when address is missing -->
          <div class="flex flex-col-reverse md:flex-row gap-4">
            <UButton variant="outline" class="w-full text-center px-10 justify-center">
              <NuxtLink to="/cart" class="text-sm items-center flex gap-x-2">
                <UIcon name="i-lucide-arrow-left" />
                <span>Return to cart</span>
              </NuxtLink>
            </UButton>
            <UButton
              v-if="
                (!hasCompleteAddress && selectedDeliveryMethod === DeliveryMethod.SHIPPING) ||
                !selectedDeliveryMethod
              "
              disabled
              size="lg"
              class="w-full text-center px-10 justify-center flex opacity-60 cursor-not-allowed"
            >
              <span>Checkout</span>
              <UIcon name="i-lucide-arrow-right" />
            </UButton>
            <UButton
              v-else
              :loading="isLoading"
              @click="checkoutCart"
              type="submit"
              size="lg"
              class="w-full text-center px-10 justify-center flex"
            >
              <span>Checkout</span>
              <UIcon name="i-lucide-arrow-right" />
            </UButton>
          </div>
        </section>

        <div
          class="border-t border-neutral-200 pt-6 lg:sticky lg:top-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
        >
          <h2 class="font-oswald text-2xl text-neutral-950">Order summary</h2>
          <p v-if="isPreviewLoading" class="mt-3 text-sm text-neutral-500">
  Calculating your promotional discount and shipping...
</p>
<p v-if="previewError" class="mt-3 text-sm text-red-600">
  {{ previewError }}
</p>
          <ul class="mt-5 divide-y divide-neutral-200">
            <li
              v-for="item in cartItems"
              :key="item.cartId"
              class="flex justify-between gap-4 py-3"
            >
              <div class="space-y-0.5 max-w-8/10">
                <p class="text-sm text-neutral-700">
                  {{ item.product?.name }}
                  <span class="font-mono text-xxs">
                    &nbsp; x {{ item.quantity }} {{ item.quantity > 1 ? 'units' : 'unit' }}</span
                  >
                </p>
                <UBadge variant="soft" class="block w-fit"> SKU : {{ item?.product?.sku }} </UBadge>
              </div>
              <span class="shrink-0 text-sm text-neutral-700">
                {{ NumberFunctions.formatCurrency(item.total, item.price.currency) }}
              </span>
            </li>
          </ul>
          <div
            class="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-bold text-neutral-950"
          >
            <span>Subtotal</span>
       <span>{{ NumberFunctions.formatCurrency(checkoutPreview?.original_subtotal ?? subtotal, Currency.AUD) }}</span>
          </div>
          <div
  v-if="checkoutPreview && checkoutPreview.discount_amount > 0"
  class="mt-3 flex justify-between text-sm text-green-700"
>
  <span>WEEKLY20 Promotional Discount (20%)</span>
  <span>-{{ NumberFunctions.formatCurrency(checkoutPreview.discount_amount, Currency.AUD) }}</span>
</div>
          
<div
  v-if="checkoutPreview"
  class="mt-3 flex justify-between text-sm text-neutral-700"
>
  <span>Shipping</span>
  <span>{{ NumberFunctions.formatCurrency(checkoutPreview.shipping_charge, Currency.AUD) }}</span>
</div>

<div
  v-if="checkoutPreview"
  class="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-bold text-neutral-950"
>
  <span>Discounted product subtotal (ex GST)</span>
  <span>{{ NumberFunctions.formatCurrency(checkoutPreview.discounted_subtotal, Currency.AUD) }}</span>
</div>

<div v-if="checkoutPreview" class="mt-3 flex justify-between text-sm text-neutral-700">
  <span>Subtotal including shipping (ex GST)</span>
  <span>{{ NumberFunctions.formatCurrency(checkoutPreview.subtotal_ex_gst, Currency.AUD) }}</span>
</div>

<div v-if="checkoutPreview" class="mt-3 flex justify-between text-sm text-neutral-700">
  <span>GST (10%)</span>
  <span>{{ NumberFunctions.formatCurrency(checkoutPreview.gst_amount, Currency.AUD) }}</span>
</div>

<div
  v-if="checkoutPreview"
  class="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-lg font-bold text-neutral-950"
>
  <span>Total payable (inc GST)</span>
  <span>{{ NumberFunctions.formatCurrency(checkoutPreview.total_inc_gst, Currency.AUD) }}</span>
</div>

<p v-if="checkoutPreview" class="mt-3 text-xs leading-5 text-neutral-500">
  Prices and shipping are GST-exclusive. Final order taxes will be confirmed by Zoho at checkout.
</p>
        </div>
      </div>
    </template>
  </UContainer>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart-store'
import { useAuthStore } from '~/store/auth-store'
import { CartService } from '~/services/cart.service'
import { Currency, DeliveryMethod } from '~/types/enums'
import { RouteName } from '~/constants/route-names'

definePageMeta({
  middleware: 'auth',
  name: RouteName.Checkout
})

const cartStore = useCartStore()
const { user } = storeToRefs(useAuthStore())
const { cartItems, subtotal } = storeToRefs(cartStore)
const toast = useToast()
const isLoading = ref(false)
const promoCode = ref('')
const checkoutPreview = ref<any>(null)
const isPreviewLoading = ref(false)
const previewError = ref('') 
const deliveryMethods = ref([DeliveryMethod.PICKUP, DeliveryMethod.SHIPPING])
const selectedDeliveryMethod = ref<DeliveryMethod>()
// Computed check to verify if the user has a complete saved delivery address
const hasCompleteAddress = computed(() => {
  const loc = user.value?.location
  return Boolean(
    loc &&
    loc.street?.trim() &&
    loc.city?.trim() &&
    loc.state?.trim() &&
    loc.country?.trim() &&
    loc.postal_code
  )
})

useSeoMeta({ title: 'Checkout' })

onBeforeMount(async () => {
  await cartStore.fetchCart()
})

const pickupAddress = ref({
  city: 'Peakhurst ',
  state: 'NSW',
  street: '1/9 Stanley Street ',
  country: 'Australia',
  latitude: 25,
  longitude: 133,
  postal_code: '2210'
})
let latestPreviewRequestId = 0

const updateCheckoutPreview = async () => {
  const requestId = ++latestPreviewRequestId

  if (!selectedDeliveryMethod.value || cartItems.value.length === 0) {
    checkoutPreview.value = null
    previewError.value = ''
    isPreviewLoading.value = false
    return
  }

  isPreviewLoading.value = true
  previewError.value = ''
  checkoutPreview.value = null

  try {
    const response = await CartService.previewCheckout({
      delivery_method: selectedDeliveryMethod.value,
      promo_code: promoCode.value.trim()
    })

    if (requestId !== latestPreviewRequestId) return
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Checkout preview failed')
    }
    checkoutPreview.value = response.data
  } catch (error) {
    if (requestId !== latestPreviewRequestId) return
    previewError.value = 'Unable to calculate checkout pricing. Please try again.'
  } finally {
    if (requestId === latestPreviewRequestId) {
      isPreviewLoading.value = false
    }
  }
}

watch(
  [selectedDeliveryMethod, promoCode, cartItems],
  () => {
    updateCheckoutPreview()
  },
  { deep: true, immediate: true }
)

const checkoutCart = async () => {
  if (
    selectedDeliveryMethod.value === DeliveryMethod.SHIPPING &&
    !hasCompleteAddress.value
  ) {
    toast.add({ title: 'Please add a delivery address before checking out.', color: 'error' })
    return
  }

  isLoading.value = true

  try {
    if (selectedDeliveryMethod.value) {
      const response = await CartService.initializeCheckout({
       delivery_method: selectedDeliveryMethod.value,
        promo_code: promoCode.value.trim()
      })
      if (response?.data?.payment_url) {
        window.location.href = response.data.payment_url
      }
      cartStore.fetchCart()
    }
  } catch (error: any) {
    toast.add({ title: 'Failed to initialize checkout. Please try again.' })
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="css">
@media screen and (min-width: 1024px) {
  .checkout {
    display: grid !important;
    grid-template-columns: 3fr 2fr !important;
  }
}
</style>
