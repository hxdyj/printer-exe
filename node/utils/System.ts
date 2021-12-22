import os from 'os'
import path from 'path'
import { execSync } from 'child_process'

const platform = os.platform()
const isWindows = platform === 'win32'
const release = os.release()
const isWin7 = isWindows && release.startsWith('6.1')
const arch = os.arch()
export async function win7Patch() {
  //setdefaultdlldirectories 动态链接库 KERNEL32.dll
  console.log('isWin7', isWin7)
  console.log('arch', arch)
  if (isWin7) {
    let patchPath = path.resolve(__dirname, `../../win7patch/Windows6.1-KB2533623-x${arch.includes('64') ? 64 : 32}.msu`)
    return await execSync(`wusa.exe ${patchPath} /quiet /norestart`)
  }
  return Promise.resolve()
}
