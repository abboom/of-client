<script setup lang="ts">
const wrap = useTemplateRef<HTMLDivElement>('wrap')
const { x: wrapX } = useElementBounding(wrap)

const slot = defineSlots<{
  default: () => any[]
}>()

const comp = computed(() => {
  const paneComp = slot.default()
  return paneComp.filter((i) => i.type.name === 'ComTabPane')
})

const active = defineModel<string>('active', {
  default: '',
})

withDefaults(
  defineProps<{
    sliderCls?: string
    sliderTrackCls?: string
  }>(),
  {
    sliderCls: 'w-10',
    sliderTrackCls: '',
  },
)

const itemX = ref<Record<string, number>>({})

provide(TABS_KEY, active)
provide(TABS_ITEM_FN, (value, x) => {
  itemX.value[value] = x - wrapX.value
})

provide(TABS_ITEM_SELECT, (value) => {
  active.value = value
})

const offsetX = computed<number>(() => {
  if (itemX.value[active.value]) {
    return itemX.value[active.value]
  }

  return 0
})
</script>

<template>
  <div
    ref="wrap"
    w-full
    h-fit
  >
    <div relative>
      <div
        ref="paneWrap"
        w-fit
        h-fit
        flex
        relative
      >
        <component
          :is="c"
          v-for="c in comp"
          :key="c.key"
        />
      </div>

      <div
        class="h-[3px] w-full"
        :class="sliderTrackCls"
      >
        <div
          v-if="offsetX > 0"
          :style="{ left: offsetX + 'px' }"
          class="tab__slider"
          :class="sliderCls"
          rounded-sm
          bg-primary-active
          position-absolute
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab__slider {
  height: 3px;
  transform: translate3d(-50%, 0, 0);
  transition: left 250ms;
}
</style>
