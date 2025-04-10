import Store from 'electron-store';

Store.initRenderer();

export type Conf = {
  proxyAddress: string
  proxyPort: string
  proxyEnabled: boolean
}

export type ConfKey = keyof Conf

const store = new Store<Conf>({name: 'of-client'})

export function getConf<T extends ConfKey>(key: T): Conf[T] {
  return store.get(key)
}

export function setConf<T extends ConfKey>(key: T, value: Conf[T]) {
  store.set(key, value)
}