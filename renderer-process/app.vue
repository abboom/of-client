<script setup lang="ts">
onMounted(() => {
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 123 || e.key === 'F12') {
      window.electronAPI.send('open-dev-tool')
    }
  })
})

const colorMode = useColorMode()
</script>

<template>
  <AConfigProvider :theme="{ token: colorMode.value === 'dark' ? darkTokenMap : defaultTokenMap }">
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
