export enum RTM {
  OPEN_DEV_TOOL = 'open-dev-tool',
  CLOSE_WINDOW = 'close-window',
  MINI_WINDOW = 'mini-window',
  LOGIN = 'login',
  UPDATE_VERSION_IMMEDIATELY = 'update-version-immediately',
  UPDATE_VERSION_Later = 'update-version-later',
  ADD_VIDEO_UPLOAD_TASK = 'add-video-upload-task',
}

export enum BOTH {
  OPEN_DIALOG = 'open-dialog',
  OPEN_IMAGE_CROPPER = 'open-image-cropper',
  INIT_UPLOAD_QUEUE = 'init-upload-queue',
  SELECT_IMAGE = 'select-image',
  SELECT_VIDEO = 'select-video',
  START_UPLOAD_TASK = 'start-upload-task',
  PAUSE_UPLOAD_TASK = 'pause-upload-task',
}

export enum MTR {
  UPLOAD_TASKS = 'upload-tasks',
  NEW_VERSION_DOWNLOAD_PROGRESS = 'new-version-download-progress'
}

export type OnEventChannels = `${RTM}`

export type HandleEventChannels = `${BOTH}`

export type SendEventChannels = `${MTR}`
