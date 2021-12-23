import { app, Tray } from 'electron'
import path from 'path'
import { startServer } from './node/koa'
import { createPDFdir } from './node/utils/download'
app.on('ready', () => {
  createPDFdir()
  createTray()
  startServer()
  app.setLoginItemSettings({
    openAtLogin: app.isPackaged ? true : false,
  })
})

let tray
function createTray() {
  tray = new Tray(path.join(__dirname, 'favicon.ico'))
  tray.setToolTip('可之科技打印程序')
}
