import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
import { startServer } from './node/koa'

// const appFolder = path.dirname(process.execPath)
// const updateExe = path.resolve(appFolder, '..', 'Update.exe')
// const exeName = path.basename(process.execPath);

// app.setLoginItemSettings({
//   openAtLogin: true,
//   args: ["--process-start-args", `"--hidden"`],
// });

app.on('ready', () => {
  // let mainWindow = new BrowserWindow({
  //   frame: false,
  //   webPreferences: {
  //     preload: path.join(__dirname, "preload.js"),
  //   },
  // });
  // const indexHTML = path.join(__dirname + "dist/index.html");
  // mainWindow.loadFile("dist/index.html"); // 此处跟electron官网路径不同，需要注意
  // mainWindow.webContents.openDevTools();
  createTray()
  startServer()
})

let tray
// 创建托盘
function createTray() {
  // 系统托盘： window 系统
  // if (process.platform === "win32") {
  // const icon =
  //   process.env.NODE_ENV === 'development'
  //     ? path.join(__dirname, 'bundled/favicon.ico')
  //     : path.join(__dirname, 'favicon.ico') // 指定托盘图标，推荐使用 ico 图标。

  // 创建托盘实例
  tray = new Tray(path.join(__dirname, 'favicon.ico'))
  // 上面托盘实例创建了，需要定义托盘中的 Menu 选项。
  // 这里使用 buildFromTemplate 静态方法。
  // 第一个：开机自启动
  // 第二个：退出
  // let menu = Menu.buildFromTemplate([
  //   {
  //     label: "开机启动",
  //     checked: app.getLoginItemSettings().openAtLogin, // 获取当前自启动状态
  //     type: "checkbox",
  //     click: () => {
  //       // 点击事件：切换自启动
  //       if (!app.isPackaged) {
  //         // 生成环境
  //         app.setLoginItemSettings({
  //           openAtLogin: !app.getLoginItemSettings().openAtLogin,
  //           path: process.execPath,
  //         });
  //       } else {
  //         app.setLoginItemSettings({
  //           openAtLogin: !app.getLoginItemSettings().openAtLogin,
  //         });
  //       }
  //     },
  //   },
  //   {
  //     label: "退出",
  //     click: function () {
  //       app.quit();
  //       app.quit();
  //     },
  //   },
  // ]);
  // 鼠标悬停时显示的文本
  tray.setToolTip('可之科技打印程序')
  // 设置上下文菜单
  // tray.setContextMenu(menu);
  // 绑定点击事件：控制 窗口显示和隐藏。
  // tray.on("click", () => {
  //   win.isVisible() ? win.hide() : win.show();
  // });
  // }
}
