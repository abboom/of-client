import type { BrowserWindow } from 'electron'

let win: BrowserWindow | null = null

export function createHomeWindow() {
  win = createFrameWindow({
    width: 1080,
    height: 680,
  })

  win.loadURL(buildWindowUrl('home'))

  win.once('ready-to-show', () => {
    setTrayMenu()
    win?.show()
  })
}

export function getHomeWindow() {
  return win
}
