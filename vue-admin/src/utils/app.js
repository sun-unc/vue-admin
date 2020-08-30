// 通过cookie存储token
import cookie from "cookie_js";

export function getToken(token) {
  return cookie.get(token);
}
export function setToken(token) {
  return cookie.set("admin_token", token);
}
export function removeToken(token) {
  return cookie.remove(token);
}
export function setUsername(value) {
  cookie.set("username", value);
}
export function removeUsername(value) {
  return cookie.remove(value);
}
