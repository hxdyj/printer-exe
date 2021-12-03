import path from 'path'
import download from 'download'
import { uid } from 'uid'
import { rm } from 'fs/promises'
// path.resolve(__dirname, `./cache/${fileName}`)
export async function downloadFile(url: string) {
  let fileName = `${new Date().getTime()}_${uid(6)}.pdf`
  return download(url, 'cache/', {
    filename: fileName,
  }).then(() => {
    return `./cache/${fileName}`
  })
}
export function deleteFile(path: string) {
  return rm(path, {
    force: true,
  })
}
