import { BrowserWindow, ipcMain } from 'electron'

ipcMain.on(RTM.LOGIN, (_event, userId: string) => {
  setUserId(userId)
  createHomeWindow()
  BrowserWindow.fromWebContents(_event.sender)?.close()
})

ipcMain.on(RTM.CLOSE_WINDOW, (_e) => BrowserWindow.fromWebContents(_e.sender)?.close())

ipcMain.on(RTM.MINI_WINDOW, (_e) => BrowserWindow.fromWebContents(_e.sender)?.minimize())

ipcMain.on(
  RTM.OPEN_DEV_TOOL,
  (_e) =>
    MODE !== 'production' && BrowserWindow.fromWebContents(_e.sender)?.webContents.openDevTools(),
)

ipcMain.on(RTM.UPDATE_VERSION_Later, (_e, _version: string) => {})
