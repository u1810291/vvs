export function getAccessTokenSession() {
  return sessionStorage.getItem("jwt");
}

export function setAccessTokenSession(token) {
  sessionStorage.setItem("jwt", token);
}

export function removeAccessTokenSession(token) {
  sessionStorage.removeItem("jwt", token);
}

export function getRefreshTokenSession() {
  return sessionStorage.getItem("refreshToken");
}

export function setRefreshTokenSession(token) {
  sessionStorage.setItem("refreshToken", token);
}

export function removeRefreshTokenSession(token) {
  sessionStorage.removeItem("refreshToken", token);
}
