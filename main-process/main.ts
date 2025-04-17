import { app } from 'electron'
import started from 'electron-squirrel-startup'
import { startServer } from './server'
import './events/index'

app.commandLine.appendSwitch('--ignore-certificate-errors-spki-list')
app.commandLine.appendSwitch('--no-proxy-server')
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (started) {
  app.quit()
}

// app.on('second-instance', (event, argv, workingDirectory) => {
//   // 当用户尝试启动第二个实例时，激活现有窗口
//   if (getLoginWindow()) {
//     // if (getLoginWindow()?.isMinimized()) getLoginWindow()?.restore();
//     getLoginWindow()?.focus();
//   }
// });

app.whenReady().then(() => {
  if (MODE === 'production') {
    startServer()
    checkForUpdate()
  }

  createLoginWindow()
  setTrayMenu()
})
