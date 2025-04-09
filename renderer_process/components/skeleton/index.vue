<script setup lang="ts">
import { SKELETON_LOADING } from './index.ts'

const props = defineProps<{
  loading?: boolean
  width?: string
  height?: string
  contextCls?: string
}>()

const injectLoading = inject(SKELETON_LOADING, ref(false))
</script>

<template>
  <div v-if="loading || injectLoading" class="loading-wrap">
    <slot name="loading">
      <div :class="contextCls" :style="{ width, height }"></div>
    </slot>
  </div>
  <slot v-else></slot>
</template>

<style lang="scss" scoped>
@keyframes css-xu9wm8-ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

.loading-wrap {
  *:not(.wrap) {
    background: linear-gradient(
      90deg,
      rgba(50, 50, 50, 0.06) 25%,
      rgba(50, 50, 50, 0.15) 37%,
      rgba(50, 50, 50, 0.06) 63%
    );
    background-size: 400% 100% !important;
    animation-name: css-xu9wm8-ant-skeleton-loading;
    animation-duration: 1.4s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }
}
</style>
