const ERRORS = {
  P2002: '已存在',
}

export const getCustomErrorMessage = (code: string, title: string) =>
  title + (ERRORS[code] || '')
