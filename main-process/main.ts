import { app } from 'electron'
import started from 'electron-squirrel-startup'
import { startServer } from './server'
import { createLoginWindow } from './windows/login'
import './events/index'
import { checkForUpdate } from './utils/auto-update'

app.commandLine.appendSwitch('--ignore-certificate-errors-spki-list')
app.commandLine.appendSwitch('--no-proxy-server')
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (started) {
  app.quit()
}

if (MODE === 'production') {
  startServer()
  checkForUpdate()
}

app.whenReady().then(() => {
  createLoginWindow()
})
