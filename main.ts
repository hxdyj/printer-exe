import { app, Tray } from 'electron'
import path from 'path'
import { startServer } from './node/koa'

app.on('ready', () => {
  createTray()
  startServer()
  app.setLoginItemSettings({
    openAtLogin: true,
    args: ['--process-start-args', `"--hidden"`],
  })
})

let tray
function createTray() {
  tray = new Tray(path.join(__dirname, 'favicon.ico'))
  tray.setToolTip('可之科技打印程序')
}
