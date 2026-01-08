export const setTimeoutForLogout = () => {
  console.log(`timeout set for logout in 60000 * 30 milliseconds`)
  setTimeout(() => {
    console.warn('LET ME KNOW WHEN LOCALSTORAGE IS BEING CLEARED')
    window.localStorage.removeItem("user")
  }, 60000 * 30)
}

export function reverse(a, b) {
  return b.likes - a.likes;
}

export const setToken = (newToken) => {
  let token = `Bearer ${newToken}` 
  return token
}
