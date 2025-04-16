<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  colorMode: 'light',
})
</script>

<template>
  <div class="text-primary">
    <a-space wrap>
      <a-button type="primary"> Primary Button </a-button>
      <a-button>Default Button</a-button>
      <a-button type="dashed"> Dashed Button </a-button>
      <a-button type="text"> Text Button </a-button>
      <a-button type="link"> Link Button </a-button>
    </a-space>
  </div>
</template>

<style scoped></style>
