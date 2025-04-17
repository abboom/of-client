<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'qrcode' | 'account'
  }>(),
  {
    type: 'account',
  },
)
</script>

<template>
  <div
    w-25
    h-25
    bg-primary
    hover:bg-primary-active
    transition-colors
    overflow-hidden
    style="transform: rotateZ(-45deg); right: -50px; bottom: -50px"
  >
    <div
      v-if="type === 'account'"
      style="transform: rotateZ(45deg)"
      class="top-[-20px] left-[20px] position-absolute"
    >
      <div class="i-cus:qrcode-v1 text-[60px] text-white" />
    </div>

    <div
      v-else
      style="transform: rotateZ(45deg)"
      class="top-[-25px] left-[15px] position-absolute"
    >
      <Icon
        class="text-white"
        name="cus:compute"
        size="52"
      />
    </div>
  </div>
</template>
