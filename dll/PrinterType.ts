import { getPrinters } from 'pdf-to-printer'
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T
type UnwrapArray<T> = T extends Array<infer V> ? V : T
export type PaperSizeItem = {
  Height: number
  Kind: string
  PaperName: string
  RawKind: number
  Width: number
}

export type TrayItem = {
  Kind: string
  RawKind: number
  SourceName: string
}
export type PrinterItem = UnwrapArray<UnwrapPromise<ReturnType<typeof getPrinters>>>
