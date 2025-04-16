import path from 'node:path'
import { Menu, Tray, app, nativeImage } from 'electron'

export async function setTrayMenu() {
  let trayIcon

  if (MODE === 'development') {
    trayIcon = nativeImage.createFromPath(
      path.resolve(__dirname, '..', '..', 'build/icons/1024x1024.png'),
    )
  }
  else {
    trayIcon = nativeImage.createFromPath(path.resolve(resourcePath, 'icons/1024x1024.png'))
  }

  const tray = new Tray(trayIcon)

  // 定义菜单模板
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开onlyfuck', click: () => {} },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ])

  tray.on('click', () => {})

  // 绑定菜单到托盘
  tray.setContextMenu(contextMenu)
  tray.setToolTip('onlyfuck')
}
