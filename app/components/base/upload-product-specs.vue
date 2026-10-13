<template>
  <div class="flex gap-x-2 relative items-center" v-if="user?.accountType === AccountType.ADMIN">
    <UButton
      v-bind="$attrs"
      :label="hasProductSpecs ? 'Update Product specs' : 'Add Product Specs'"
      icon="i-lucide-file-up"
      size="lg"
      class="justify-center"
      @click="open()"
    />
    <UTooltip mode="hover" :open-delay="500" :close-delay="300" v-if="hasProductSpecs">
      <UIcon
        name="i-lucide-trash"
        color="error"
        class="text-error cursor-pointer"
        size="16px"
        @click="deleteProductSpecs()"
      />
      <template #content>
        <p class="inline-flex">Delete Product Specs</p>
      </template>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/store/admin-store'
import { useAuthStore } from '~/store/auth-store'
import { AccountType } from '~/types/enums'

import type { ProductDataEntity, ProductEntity } from '~/types/product'

const props = defineProps<{
  product: ProductDataEntity | ProductEntity
  hasProductSpecs: boolean
}>()

const emit = defineEmits(['updated'])
const adminStore = useAdminStore()
const { user } = storeToRefs(useAuthStore())

const { open, reset, onChange } = useFileDialog({
  accept: '.pdf,.doc,.docx,.txt',
  multiple: false
})

onChange(async (selectedFiles) => {
  if (!selectedFiles || selectedFiles.length === 0) return

  const file = selectedFiles[0]
  if (file) {
    await adminStore.uploadProductSpecs(props.product.item_id, file)
  }
  emit('updated')
  reset()
})

const deleteProductSpecs = async () => {
  await adminStore.deleteProductSpecs(props.product.item_id)
  emit('updated')
}
</script>
