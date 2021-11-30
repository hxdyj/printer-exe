export default class Result {
  constructor(data: unknown = '', code: number = 200, msg: string = '') {
    let result = {
      data: data,
      code: code,
      msg: msg,
    }
    Reflect.set(result, '__proto__', Result.prototype)
    return result
  }
}
