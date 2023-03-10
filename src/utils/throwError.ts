export function badRequest(message: string) {
  throw { code: 'Bad request', message }
}

export function unauthorized(message: string) {
  throw { code: 'Unauthorized', message }
}

export function notFound(message: string) {
  throw { code: 'Not Found', message }
}

export function conflit(message: string) {
  throw { code: 'Conflit', message }
}

export function notAcceptable(message: string) {
  throw { code: 'Not Acceptable', message }
}

export function forbidden() {
  throw {
    code: 'Forbidden',
    message: 'Sua autenticação não permite realizar essa operação'
  }
}
