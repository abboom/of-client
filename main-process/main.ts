import path from 'node:path'
import { app } from 'electron'
import started from 'electron-squirrel-startup'
import { startServer } from './server'
import './events/index'

app.commandLine.appendSwitch('--ignore-certificate-errors-spki-list')
app.commandLine.appendSwitch('--no-proxy-server')
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
}
else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}

const gotTheLock = app.requestSingleInstanceLock()
let isScondInstance = false

if (!gotTheLock) {
  app.quit()
}
else {
  app.on('second-instance', () => {
    isScondInstance = true

    const loginWindow = getLoginWindow()
    if (loginWindow) {
      if (loginWindow.isMinimized()) loginWindow.restore()
      loginWindow.focus()
    }
    else {
      const home = getHomeWindow()
      home?.show()
      if (home?.isMaximized()) home.restore()
      home?.focus()
    }
  })
}

if (started) {
  app.quit()
}

app.whenReady().then(() => {
  if (!gotTheLock) return

  if (MODE === 'production') {
    startServer()
    checkForUpdate()
  }

  createLoginWindow()
})
