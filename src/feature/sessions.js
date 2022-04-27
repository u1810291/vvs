export function setEmailRecoverySession(token) {
  return localStorage.setItem("ets", token);
}

export function getEmailRecoverySession(token) {
  return localStorage.getItem("ets", token);
}

export function removeEmailRecoverySession(token) {
  return localStorage.removeItem("ets", token);
}

export function getRefreshTokenSession() {
  return sessionStorage.getItem("rt");
}

export function setRefreshTokenSession(token) {
  sessionStorage.setItem("rt", token);
}

export function removeRefreshTokenSession(token) {
  sessionStorage.removeItem("rt", token);
}