export function setProxyConf() {}

export function minWindow() {
  window.electronAPI.send('mini-window')
}

export function closeWindow() {
  window.electronAPI.send('close-window')
}
