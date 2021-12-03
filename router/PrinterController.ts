import { GET, Path, POST } from 'koa-ts-decorator-router'
import { deleteFile, downloadFile } from '../node/utils/download'
import { print, getDefaultPrinter, getPrinters } from 'pdf-to-printer'
import Result from '../node/utils/Result'
import { ErrorCode } from '../config/ErrorCode'
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
    try {
      await print(pdfPath, printConf)
      deleteFile(pdfPath)
      return new Result(
        {
          pdfPath,
          printConf,
        },
        ErrorCode.Success,
        '打印成功'
      )
    } catch (error) {
      deleteFile(pdfPath)
      return new Result('', ErrorCode.Fail, JSON.stringify(error))
    }
  }
}
