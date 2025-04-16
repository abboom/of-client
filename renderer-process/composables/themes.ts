import { theme } from 'ant-design-vue'

const { defaultAlgorithm, defaultSeed, darkAlgorithm } = theme

export const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
export const toggleDark = useToggle(isDark)

export const darkTokenMap = computed(() => {
  defaultSeed.colorPrimary = '#d44e7d'
  defaultSeed.fontSize = 12

  return darkAlgorithm(defaultSeed)
})

export const defaultTokenMap = computed(() => {
  defaultSeed.colorPrimary = '#ff6699'
  defaultSeed.fontSize = 12

  return defaultAlgorithm(defaultSeed)
})

export const tokenMap = computed(() => {
  return isDark.value ? darkTokenMap.value : defaultTokenMap.value
})
