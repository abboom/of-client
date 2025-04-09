<script setup lang="tsx">
import { useElementSize } from '@vueuse/core'
import { SCROLL_BOUNDS } from '@/components/scrollbar/index.ts'

interface BarStatus {
  offset: string
  scroll: string
  scrollSize: string
  size: string
  key: string
  axis: string
  client: string
  direction: string
}

interface StyleParams {
  move: number
  size: string
  bar: BarStatus
}

const BAR_MAP: Record<string, BarStatus> = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
}

function renderThumbStyle({ move, size, bar }: StyleParams) {
  const style: Record<string, any> = {}
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

const scrollbarWrap = useTemplateRef<HTMLDivElement>('wrap')
const sizeWidth = ref('0')
const sizeHeight = ref('0')
const moveX = ref(0)
const moveY = ref(0)
provide('wrap', scrollbarWrap)

const { width, height } = useElementSize(scrollbarWrap)

watch(
  () => [width.value, height.value],
  () => {
    update()
  },
)

const update = () => {
  const heightPercentage =
    (scrollbarWrap.value!.clientHeight * 100) / scrollbarWrap.value!.scrollHeight
  const widthPercentage =
    (scrollbarWrap.value!.clientWidth * 100) / scrollbarWrap.value!.scrollWidth
  sizeHeight.value = heightPercentage < 100 ? heightPercentage + '%' : ''
  sizeWidth.value = widthPercentage < 100 ? widthPercentage + '%' : ''
}

const bounds = ref({
  scrollTop: 0,
  scrollLeft: 0,
})

provide(SCROLL_BOUNDS, bounds)

const handleScroll = () => {
  bounds.value.scrollLeft = scrollbarWrap.value!.scrollLeft
  bounds.value.scrollTop = scrollbarWrap.value!.scrollTop
  moveY.value = (scrollbarWrap.value!.scrollTop * 100) / scrollbarWrap.value!.clientHeight
  moveX.value = (scrollbarWrap.value!.scrollLeft * 100) / scrollbarWrap.value!.clientWidth
}

onMounted(() => {
  scrollbarWrap.value?.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  scrollbarWrap.value?.removeEventListener('resize', update)
})

const Bar = defineComponent(
  (props) => {
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    const wrap = inject<Ref<HTMLDivElement>>('wrap')
    const cursorDown = ref<boolean>(false)
    const thumb = ref<HTMLDivElement>()
    const barRef = ref<HTMLDivElement>()
    const axis = reactive({ X: 0, Y: 0 })

    const clickTrackHandler = (e: any) => {
      const offset = Math.abs(
        e.target?.getBoundingClientRect()[bar.value.direction] - e[bar.value.client],
      )

      // @ts-ignore
      const thumbHalf = thumb.value[bar.value.offset] / 2
      // @ts-ignore
      const thumbPositionPercentage =
        // @ts-ignore
        ((offset - thumbHalf) * 100) / barRef.value?.[bar.value.offset]
      // @ts-ignore
      wrap.value.scrollTo({
        // @ts-ignore
        [bar.value.direction]:
          // @ts-ignore
          (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100,
        behavior: 'smooth',
      })
    }

    // @ts-ignore
    const clickThumbHandler = (e) => {
      if (e.ctrlKey || e.button === 2) {
        return
      }
      startDrag(e)
      // @ts-ignore
      axis[bar.value.axis] =
        e.currentTarget[bar.value.offset] -
        (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction])
    }

    // @ts-ignore
    const startDrag = (e) => {
      e.stopImmediatePropagation()
      cursorDown.value = true

      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: any) => {
      if (cursorDown.value === false) return
      // @ts-ignore
      const prevPage = axis[bar.value.axis]

      if (!prevPage) return
      // @ts-ignore
      const offset =
        // @ts-ignore
        (barRef.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      // @ts-ignore
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      // @ts-ignore
      const thumbPositionPercentage =
        // @ts-ignore
        ((offset - thumbClickPosition) * 100) / barRef.value[bar.value.offset]
      // @ts-ignore
      wrap.value[bar.value.scroll] =
        // @ts-ignore
        (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }

    const mouseUpDocumentHandler = () => {
      cursorDown.value = false
      // @ts-ignore
      axis[bar.value.axis] = 0
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    onUnmounted(() => document.removeEventListener('mouseup', mouseUpDocumentHandler))

    return () =>
      props.size
        ? h(
            'div',
            {
              ref: barRef,
              class: ['scrollbar__bar !z-9999', 'is-' + bar.value.key],
              onMousedown: clickTrackHandler,
            },
            [
              h('div', {
                ref: thumb,
                class: 'scrollbar__thumb',
                style: renderThumbStyle({
                  move: props.move,
                  size: props.size,
                  bar: bar.value,
                }),
                onMousedown: clickThumbHandler,
              }),
            ],
          )
        : h('div')
  },
  {
    props: {
      vertical: Boolean,
      size: String,
      move: Number,
    },
  },
)
</script>

<template>
  <div class="scrollbar">
    <div ref="wrap" class="scrollbar__wrap !z-0" @scroll="handleScroll">
      <div ref="view" class="scrollbar__view relative">
        <slot></slot>
      </div>
    </div>
    <Bar :move="moveY" :size="sizeHeight" vertical></Bar>
  </div>
</template>

<style lang="scss">
.scrollbar {
  width: 100%;
  height: 100%;
  position: relative;

  &:hover,
  &:active,
  &:focus {
    > .scrollbar__bar {
      opacity: 1;
      transition: opacity 340ms ease-out;
    }
  }

  &__wrap {
    overflow: scroll;
    height: 100%;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__view {
    width: 100%;
    min-height: 100%;
  }

  .scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 120ms ease-out;

    &.is-vertical {
      width: 6px;
      top: 2px;

      > div {
        width: 100%;
      }
    }

    &.is-horizontal {
      height: 6px;
      left: 2px;

      > div {
        height: 100%;
      }
    }
  }

  .scrollbar__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(#909399, 0.5);
    transition: 0.3s background-color;
    z-index: 9999;

    &:hover {
      background-color: rgba(#909399, 0.5);
    }
  }
}
</style>
