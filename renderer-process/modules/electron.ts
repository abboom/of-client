// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import { defineNuxtModule } from 'nuxt/kit'
import type { HandleEventChannels, OnEventChannels, SendEventChannels } from '~~/main-process/utils/ipc'
import type { Conf, ConfKey } from '~~/main-process/utils/setting'

export default defineNuxtModule({
  meta: {
    name: 'electron',
  },
  setup() {

  },
})

declare global {
  interface Window {
    electronAPI: {
      send(chanel: OnEventChannels, ...arg: any[]): void
      invoke<T = unknown>(chanel: HandleEventChannels, ...arg: never[]): Promise<T>
      on<T = unknown>(chanel: SendEventChannels, func: (...args: T[]) => void): void
      once<T = unknown>(chanel: SendEventChannels, func: (...args: T[]) => void): void
      getPathForFile(file: File): string
      getConf<T extends ConfKey>(key: T): Promise<Conf[T]>
      setConf<T extends ConfKey>(key: T, value: Conf[T]): void
    }

    versions: {
      electron: string
      node: string
      chrome: string
      app: string
    }
  }
}
