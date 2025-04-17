import type { ConfKey, Conf } from './../main-process/utils/setting'
import {
  OnEventChannels,
  HandleEventChannels,
  SendEventChannels,
  RTM,
} from '../main-process/utils/ipc.ts'

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
