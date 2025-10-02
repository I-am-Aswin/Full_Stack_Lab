// Minimal JWT decode utility (no validation, just base64 decode)
export default function jwt_decode(token) {
  if (!token) return {};
  const payload = token.split('.')[1];
  if (!payload) return {};
  try {
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}
