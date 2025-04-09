<script setup lang="ts">
defineOptions({ name: 'NavTabsWrap' })
defineProps<{ show: boolean }>()
</script>

<template>
  <fade-transition>
    <div v-if="show" class="no-drag">
      <teleport to="#header-wrapper">
        <div h-full flex items-center>
          <slot></slot>
        </div>
      </teleport>
    </div>
  </fade-transition>
</template>
