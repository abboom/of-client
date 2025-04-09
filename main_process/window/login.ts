export function createLoginWindow() {
  const win = createFrameWindow({
    width: 368,
    height: 470,
  })

  win.loadURL(SERVER_URL + '/login')

  win.once('ready-to-show', () => {
    win.webContents.openDevTools()
    win?.show()
  })
}
