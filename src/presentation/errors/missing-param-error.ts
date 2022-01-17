export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Misssing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
