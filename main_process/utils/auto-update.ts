import { updateElectronApp } from 'update-electron-app'
import log from 'electron-log'

export function checkForUpdate() {
  updateElectronApp({
    logger: log,
  })
}
