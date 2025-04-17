import * as path from 'path'
import type { ForgeConfig } from '@electron-forge/shared-types'
import MakerSquirrel from '@electron-forge/maker-squirrel'
import MakerZIP from '@electron-forge/maker-zip'
import MakerDeb from '@electron-forge/maker-deb'
import MakerRpm from '@electron-forge/maker-rpm'
import VitePlugin from '@electron-forge/plugin-vite'
import FusesPlugin from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'
import { serialHooks } from '@electron/packager'
import modifyPackage from './build/scripts/modify-package-json'

const appName = 'onlyfuck'

const config: ForgeConfig = {
  outDir: './.release',
  packagerConfig: {
    name: appName,
    asar: true,
    icon: path.resolve(process.cwd(), './build/icons/icon.ico'),
    extraResource: [path.resolve(process.cwd(), 'build/icons')],
    afterCopy: [serialHooks([modifyPackage(appName)])],
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        authToken: process.env.GITHUB_TOKEN,
        generateReleaseNotes: true,
        force: true,
        repository: {
          owner: 'abboom',
          name: 'of-client',
        },
        prerelease: false,
      },
    },
  ],
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: appName,
      setupIcon: path.resolve(process.cwd(), './build/icons/icon.ico'),
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'main-process/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'main-process/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
}

export default config
