<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    height?: string
  }>(),
  {
    title: '',
    height: 'h-10',
  },
)
</script>

<template>
  <div class="w-full" :class="[height]">
    <div class="w-full flex items-center justify-between" :class="[height]">
      <slot name="title">
        <span class="text-primary">{{ title }}</span>
      </slot>

      <div class="flex"><slot></slot></div>
    </div>
  </div>
</template>
