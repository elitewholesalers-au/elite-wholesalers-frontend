<template>
  <div class="flex items-center justify-center py-5">
    <ScriptYouTubePlayer
      ref="video"
      video-id="xArTod5Rz6o"
      :above-the-fold="true"
      :cookies="false"
      class="rounded-lg overflow-hidden shadow-lg"
      referrerpolicy="strict-origin-when-cross-origin"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      allowfullscreen
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
          />
        </div>
      </template>

      <template #loading>
        <div class="bg-blue-500 text-white p-5 flex items-center justify-center w-full h-full">
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
      if (typeof video.value.player.mute === 'function') {
        video.value.player.mute()
      }
      video.value.player.playVideo()
    }
  } catch (error) {
    console.warn('Autoplay restricted or configuration error:', error)
  }
}

function stateChange(event: any) {
  // Optional state tracking
}
</script>
