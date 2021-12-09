import Koa from 'koa'
import Router from 'koa-router'
import KoaBody from 'koa-body'
import path from 'path'
import ClassifyKoaRouter from 'koa-ts-decorator-router'
import Result from './utils/Result'
import { ErrorCode } from '../config/ErrorCode'
import { G } from '../config/G'
import https from 'https'
import fs from 'fs'

const app = new Koa()
// set cors
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Content-Type', 'application/json; charset=utf-8')
  ctx.set('Access-Control-Allow-Headers', 'accessToken, Content-Type')
  //https://segmentfault.com/q/1010000005067552/a-1020000005157959  POST block is not worked.
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  if (ctx.method === 'OPTIONS') {
    ctx.body = ''
    ctx.status = 204
  } else {
    await next()
  }
})
// parse body from
app.use(
  KoaBody({
    multipart: true,
  })
)

const router = new Router()
function startServer() {
  app.use(
    ClassifyKoaRouter(
      router,
      {
        dirname: path.resolve(__dirname, '../router'),
        filter: /(.*Controller)\.(ts|js)$/,
      },
      {
        logRoute: false,
      }
    )
  )

  // deal all response at here.  auto instance Result class to wrap response body.
  app.use(ctx => {
    if (ctx.status === 200 && !(ctx.body instanceof Result)) {
      ctx.body = new Result(ctx.body, ErrorCode.Success)
    }
  })
  app.listen(G.port.http)
  https
    .createServer(
      {
        key: fs.readFileSync(path.resolve(__dirname, '../key/server.key'), 'utf8'),
        cert: fs.readFileSync(path.resolve(__dirname, '../key/server.cert'), 'utf8'),
      },
      app.callback()
    )
    .listen(G.port.https)
}
export { router, startServer }
export default app
