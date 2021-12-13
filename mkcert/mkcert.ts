import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'
import { app } from 'electron'
const mkcertPath = path.resolve(__dirname, './mkcertv1.4.3.exe')
export async function installCaToLocal() {
  return await execFileSync(mkcertPath, ['-install'])
}
function getCertOutputPath(name: string) {
  return path.resolve(app.getPath('userData'), './key/', name)
}
const keyPath = getCertOutputPath('server.key')
const certPath = getCertOutputPath('server.cert')

async function genCert() {
  return await execFileSync(mkcertPath, ['-key-file', keyPath, '-cert-file', certPath, 'localhost', '127.0.0.1', '::1'])
}
export async function getCert() {
  let outputDir = getCertOutputPath('')
  console.log('outputDir', outputDir)
  let hasDir = await fs.existsSync(outputDir)
  if (!hasDir) {
    await fs.mkdirSync(outputDir)
  }
  await genCert()
  return {
    key: keyPath,
    cert: certPath,
  }
}
