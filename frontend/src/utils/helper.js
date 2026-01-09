export const setTimeoutForLogout = () => {
  setTimeout(() => {
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
