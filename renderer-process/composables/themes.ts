import { theme } from 'ant-design-vue'

const { defaultAlgorithm, defaultSeed, darkAlgorithm } = theme

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
