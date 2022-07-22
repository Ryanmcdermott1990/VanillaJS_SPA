export default function navigate(payload) {
  window.history.pushState(payload?.state, "", payload.path);
  window.history.go(0);
}
