<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-950"
  >
    <UContainer class="flex max-w-md flex-col items-center text-center">
      <!-- Base Logo Component with responsive spacing -->
      <div class="mb-8">
        <BaseLogo />
      </div>

      <!-- Top Badge / Status Code -->
      <UBadge
        color="error"
        variant="subtle"
        size="lg"
        class="mb-6 rounded-full px-4 py-1 font-mono text-sm"
      >
        {{ error?.statusCode || 404 }} Error
      </UBadge>

      <!-- Main Heading -->
      <h1 class="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
        Page has drifted away
      </h1>

      <!-- Description -->
      <p class="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        {{
          error?.message ||
          "We can't seem to find the page you're looking for. It might have been moved, deleted, or never existed."
        }}
      </p>

      <!-- Action Buttons (Responsive flex column on mobile, row on desktop) -->
      <div class="mt-8 flex w-full flex-col sm:flex-row items-center gap-3">
        <UButton
          color="neutral"
          variant="solid"
          size="xl"
          block
          icon="i-lucide-arrow-left"
          label="Back to Homepage"
          @click="handleError"
        />
        <UButton
          color="neutral"
          variant="outline"
          size="xl"
          block
          icon="i-lucide-life-buoy"
          label="Contact Support"
          to="/contact-us"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { error } = useNuxtApp()

const handleError = () => clearError({ redirect: '/' })
</script>
