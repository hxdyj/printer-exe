import { GET, Path, POST } from 'koa-ts-decorator-router'
import { downloadFile } from '../node/utils/download'
import { print, getDefaultPrinter, getPrinters } from 'pdf-to-printer'
type PrintParam = Parameters<typeof print>
@Path('printer')
export class PrinterController {
  @GET('sources')
  getPrinters() {
    return getPrinters()
  }

  @GET('default')
  getDefaultPrinter() {
    return getDefaultPrinter()
  }

  @POST()
  async print({ fileUrl, printConf }: { fileUrl: string; printConf?: PrintParam[1] }) {
    let pdfPath = await downloadFile(fileUrl)
    return print(pdfPath, printConf)
  }
}
