import path from 'path'
import download from 'download'
import { uid } from 'uid'
import { rm } from 'fs/promises'
import { app } from 'electron'
import fs from 'fs'

export function getPDFoutputPath(name: string) {
  return path.resolve(app.getPath('userData'), './pdf/', name)
}
const pdfDir = getPDFoutputPath('')
export async function createPDFdir() {
  console.log('PDF outputDir', pdfDir)
  let hasDir = await fs.existsSync(pdfDir)
  if (!hasDir) {
    await fs.mkdirSync(pdfDir)
  }
  return Promise.resolve()
}

export async function downloadFile(url: string) {
  let fileName = `${new Date().getTime()}_${uid(6)}.pdf`
  return download(url, pdfDir, {
    filename: fileName,
  }).then(() => {
    return path.resolve(pdfDir, `./${fileName}`)
  })
}
export function deleteFile(path: string) {
  return rm(path, {
    force: true,
  })
}
