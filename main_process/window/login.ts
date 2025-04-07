export function createLoginWindow() {
  const win = createFrameWindow({
    width: 368,
    height: 470,
  })

  win.loadURL(htmlUrl + '/login.html')

  win.once('ready-to-show', () => {
    win?.show()
  })
}
