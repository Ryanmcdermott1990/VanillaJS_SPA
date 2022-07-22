export default function navigate(payload) {
  window.history.pushState(payload.state, "", payload.path);
  window.history.pushState(null, "", payload.path);
  window.history.back();
}
