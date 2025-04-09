export function closeWindow() {
  window.electronAPI.send('close-window')
}

export function minWindow() {
  window.electronAPI.send('mini-window')
}

export function openDevTools() {
  document.onkeydown = function (e) {
    if (e.key === 'F12') {
      window.electronAPI.send('open-dev-tool')
    }
  }
}

export function getParamByRegex(key: string): string | null {
  const regex = new RegExp(`[?&]${key}=([^&#]*)`, 'i')
  const match = window.location.href.match(regex)
  return match ? decodeURIComponent(match[1]) : null
}
