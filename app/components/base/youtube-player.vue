<template>
  <div class="flex items-center justify-center py-5">
    <!-- Apply rounded classes and overflow-hidden directly here -->
    <ScriptYouTubePlayer
      ref="video"
      video-id="xArTod5Rz6o"
      :above-the-fold="true"
      :cookies="false"
      class="rounded-lg overflow-hidden shadow-lg"
      @ready="onReady"
      @state-change="stateChange"
    >
      <template #placeholder>
        <div class="relative w-full h-full">
          <img
            src="/images/thumbnail.jpg"
            alt="Video thumbnail"
            class="w-full h-full object-cover"
          />

          <UIcon
            name="i-logos-youtube-icon"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="50px"
            @click="onReady()"
          />
        </div>
      </template>

      <template #loading>
        <div class="bg-primary-800 text-white p-5 flex items-center justify-center w-full h-full">
          Loading video...
        </div>
      </template>
    </ScriptYouTubePlayer>
  </div>
</template>

<script setup lang="ts">
const video = ref()

async function onReady() {
  try {
    await nextTick()
    if (video.value?.player?.playVideo) {
      video.value.player.playVideo()
    }
  } catch (error) {
    console.error('Autoplay error:', error)
  }
}

function stateChange(event: any) {
  // Optional state tracking
}
</script>
