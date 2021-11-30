import { Path } from 'koa-ts-decorator-router'
import { G } from '../config/G'

@Path('/')
export class VersionController {
  version() {
    return G.version
  }
}
