import { Meta } from './vue-router'

export {}

declare module 'vue' {
  interface ComponentCustomOptions {
    layout?: 'empty' | 'default'
    path?: string
    meta?: Meta
    theme?: 'dark' | 'light'
  }
}
