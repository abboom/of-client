<script setup lang="ts">
defineOptions({
  name: 'ComTabPane',
})

const tempRef = useTemplateRef('tab-pane')

const props = defineProps<{
  value: string
  label?: string
}>()

const activeKey = inject(TABS_KEY)

const fn = inject(TABS_ITEM_FN, (_) => _)

const selectFn = inject(TABS_ITEM_SELECT, (_) => _)

const { x, width, update } = useElementBounding(tempRef)

setTimeout(() => {
  update()
}, 300)

watchEffect(() => fn?.(props.value, x.value + width.value / 2))
</script>

<template>
  <button
    ma-1
    px-3
    py-2
    block
    cursor-pointer
    :class="[{ 'text-primary': activeKey === props.value }]"
    @click="selectFn(props.value)"
  >
    <span ref="tab-pane">
      <slot>
        {{ label }}
      </slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
button {
  background: transparent;
  border: transparent;
  cursor: pointer;
  transition: color 250ms;
}
</style>
