import { contextBridge, ipcRenderer, type IpcRendererEvent, webUtils } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  electron: () => process.versions.electron,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
})

contextBridge.exposeInMainWorld('electronAPI', {
  send(channel: OnEventChannels, ...args: any[]) {
    ipcRenderer.send(channel, ...args)
  },
  on(channel: SendEventChannels, func: (...args: any[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args)
    ipcRenderer.on(channel, subscription)
    return () => ipcRenderer.removeListener(channel, subscription)
  },
  invoke(channel: HandleEventChannels, ...args: any[]) {
    return ipcRenderer.invoke(channel, ...args)
  },
  getPathForFile: (file: File) => webUtils.getPathForFile(file),

  getConf: (key: any) => ipcRenderer.invoke('get-conf', key),
  setConf: (key: any, value: any) => ipcRenderer.send('set-conf', key, value)
})
