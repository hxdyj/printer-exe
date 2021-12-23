import { GET, Path, POST } from 'koa-ts-decorator-router'
import { deleteFile, downloadFile } from '../node/utils/download'
import { print, getDefaultPrinter, getPrinters } from 'pdf-to-printer'
import Result from '../node/utils/Result'
import { ErrorCode } from '../config/ErrorCode'
import { DllHandler } from '../dll/DllHandler'
import { PrinterItem } from '../dll/PrinterType'

type PrintParam = Parameters<typeof print>
@Path('printer')
export class PrinterController {
  @GET('sources')
  async getPrinters() {
    let printerList: PrinterItem[] = []
    printerList.push({
      deviceId: '',
      name: '',
    })
    printerList = (await DllHandler.Printer.getPrinters()).map(item => {
      return {
        deviceId: item,
        name: item,
      }
    })
    return printerList
  }

  @GET('default')
  getDefaultPrinter() {
    return getDefaultPrinter()
  }

  @POST('get/papersizes')
  async getPaperSizes({ printerName }: { printerName: string }) {
    try {
      return await DllHandler.Printer.getPaperSizes(printerName)
    } catch (error) {
      return new Result('', ErrorCode.Fail, JSON.stringify(error))
    }
  }

  @POST('get/trays')
  async getTrays({ printerName }: { printerName: string }) {
    try {
      return await DllHandler.Printer.getTrays(printerName)
    } catch (error) {
      return new Result('', ErrorCode.Fail, JSON.stringify(error))
    }
  }

  @POST('print')
  async print({ fileUrl, printConf }: { fileUrl: string; printConf?: PrintParam[1] }) {
    let pdfPath = ''
    try {
      let pdfPath = await downloadFile(fileUrl)
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
      if (pdfPath) {
        deleteFile(pdfPath)
      }
      return new Result('', ErrorCode.Fail, JSON.stringify(error))
    }
  }
}
