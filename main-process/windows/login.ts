import { buildWindowUrl, createFrameWindow } from '../utils/window'

export function createLoginWindow() {
  const win = createFrameWindow({
    width: 368,
    height: 470,
  })

  win.loadURL(buildWindowUrl(''))

  win.once('ready-to-show', () => {
    win?.show()
  })
}
