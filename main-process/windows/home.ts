export function createHomeWindow() {
  const win = createFrameWindow({
    width: 1080,
    height: 680,
  })

  win.loadURL(buildWindowUrl('home'))

  win.once('ready-to-show', () => {
    win?.show()
  })
}
