import * as path from 'path'
import * as fs from 'node:fs'
import type { TargetArch, TargetPlatform } from '@electron/packager'

export default function modifyPackage(appName: string) {
  return function (
    buildPath: string,
    electronVersion: string,
    platform: TargetPlatform,
    arch: TargetArch,
  ) {
    return new Promise((resolve) => {
      const packageJsonPath = path.resolve(buildPath, 'package.json')
      const str = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' })) as any

      str.productName = appName

      delete str.scripts
      delete str.devDependencies
      delete str.pnpm

      fs.writeFileSync(packageJsonPath, JSON.stringify(str), { encoding: 'utf-8' })

      resolve(true)
    })
  }
}
