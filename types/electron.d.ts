import {
  OnEventChannels,
  HandleEventChannels,
  SendEventChannels,
} from '../main_process/utils/ipc.ts'

declare global {
  interface Window {
    electronAPI: {
      send(chanel: OnEventChannels, ...arg: any[]): void
      invoke<T = unknown>(chanel: HandleEventChannels, ...arg: never[]): Promise<T>
      on<T = unknown>(chanel: SendEventChannels, func: (...args: T[]) => void): void
      once<T = unknown>(chanel: SendEventChannels, func: (...args: T[]) => void): void
      getPathForFile(file: File): string
    }

    versions: {
      electron: string
      node: string
      chrome: string
      app: string
    }
  }
}
