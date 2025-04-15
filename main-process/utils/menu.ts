import { Menu, Tray, app } from 'electron'
import path from 'node:path'

export async function setTrayMenu() {

  const iconPath = path.join(__dirname, 'assets/icon.png')
  const tray = new Tray(iconPath)

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
