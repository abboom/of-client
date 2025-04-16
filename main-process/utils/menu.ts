import { Menu, Tray, app, nativeImage } from 'electron'
import path from 'node:path'

export async function setTrayMenu() {
  let trayIcon

  if (MODE === 'development') {
    trayIcon = nativeImage.createFromPath(
      path.resolve(__dirname, '..', '..', 'build/icons/1024x1024.png'),
    )
  } else {
    trayIcon = nativeImage.createFromPath(path.resolve(resourcePath, 'icons/1024x1024.png'))
  }

  const tray = new Tray(trayIcon)

  // 定义菜单模板
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示主窗口', click: () => {} },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ])

  // 绑定菜单到托盘
  tray.setContextMenu(contextMenu)
  tray.setToolTip('应用名称或提示信息') // 悬停提示[1,8,9](@ref)
}
