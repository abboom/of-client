import { type IpcMainEvent, ipcMain } from 'electron'

ipcMain.on('set-conf', <T extends ConfKey>(_event: IpcMainEvent, k: T, v: Conf[T]) => {
  setConf(k, v)
})

ipcMain.handle('get-conf', (_event, k: ConfKey) => {
  return getConf(k)
})
