import edge from 'electron-edge-js'
import path from 'path'

const PathPrinterDLL = path.join(__dirname, './Printer.dll')
enum PrinterDllType {
  Printer = 'Win.Printer',
}
enum PrinterDllMethod {
  getPrinters = 'getPrinters',
  getPaperSizes = 'getPaperSizes',
  getTrays = 'getTrays',
}
function getEdgeFunc(file: string, typeName: string, methodName: string) {
  return edge.func({
    assemblyFile: file,
    typeName,
    methodName,
  })
}

type EdgeFunc = ReturnType<typeof edge.func>
function callEdgeFunc<T>(func: EdgeFunc, param?: unknown): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    func(param, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result as T)
      }
    })
  })
}

const getPrinters = getEdgeFunc(PathPrinterDLL, PrinterDllType.Printer, PrinterDllMethod.getPrinters)
const getPaperSizes = getEdgeFunc(PathPrinterDLL, PrinterDllType.Printer, PrinterDllMethod.getPaperSizes)
const getTrays = getEdgeFunc(PathPrinterDLL, PrinterDllType.Printer, PrinterDllMethod.getTrays)

export const DllHandler = {
  Printer: {
    getPrinters: () => {
      return callEdgeFunc<string[]>(getPrinters)
    },
    getPaperSizes: (printerName: string) => {
      return callEdgeFunc<
        Array<{
          Height: number
          Kind: string
          PaperName: string
          RawKind: number
          Width: number
        }>
      >(getPaperSizes, printerName)
    },
    getTrays: (printerName: string) => {
      return callEdgeFunc<
        Array<{
          Kind: string
          RawKind: number
          SourceName: string
        }>
      >(getTrays, printerName)
    },
  },
}
