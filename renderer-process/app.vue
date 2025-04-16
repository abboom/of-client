<script setup lang="ts">
onMounted(() => {})
</script>

<template>
  <AConfigProvider>
    <AExtractStyle>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </AExtractStyle>
  </AConfigProvider>
</template>

<style lang="scss">
html {
  @apply overflow-hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
