export function setEmailRecoverySession(token) {
  return localStorage.setItem('ets', token);
}

export function getEmailRecoverySession(token) {
  return localStorage.getItem('ets', token);
}

export function removeEmailRecoverySession(token) {
  return localStorage.removeItem('ets', token);
}

export function getRefreshTokenSession() {
  return sessionStorage.getItem('9_OnIzf7Xsys5Fds2');
}

export function setRefreshTokenSession(token) {
  sessionStorage.setItem('9_OnIzf7Xsys5Fds2', token);
}

export function removeRefreshTokenSession(token) {
  sessionStorage.removeItem('9_OnIzf7Xsys5Fds2', token);
}