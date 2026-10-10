<template>
  <div>
    <div class="flex items-center justify-center py-5 rounded-4xl">
      <ScriptYouTubePlayer
        ref="video"
        video-id="xArTod5Rz6o"
        :above-the-fold="true"
        :cookies="false"
        @ready="onReady"
        @state-change="stateChange"
      >
        <template #loading>
          <div class="bg-blue-500 text-white p-5">Loading...</div>
        </template>
      </ScriptYouTubePlayer>
    </div>
  </div>
</template>

<script setup lang="ts">
const isPlaying = ref(false)
const video = ref()

// Automatically trigger play as soon as the player is ready and loaded
async function onReady() {
  try {
    await video.value?.player?.playVideo()
  } catch (error) {
    console.error('Autoplay failed:', error)
  }
}

function stateChange(event: any) {
  isPlaying.value = event.data === 1
}
</script>
