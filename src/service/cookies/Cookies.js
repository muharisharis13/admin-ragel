import Cookies from 'js-cookie'


export const setCookies = function ({ key, value }) {
  return Cookies.set(`${key}`, `${value}`)
}

export const getCookies = function ({ key }) {
  return Cookies.get(`${key}`)
}
export const removeCookies = function ({ key }) {
  return Cookies.remove(`${key}`)
}