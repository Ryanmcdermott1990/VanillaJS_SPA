import Component from "../Component";
import uuidv4 from "../Helpers/uuid";

export default function Button(text, onClick) {
  const mountSelector = uuidv4() + "buttonMount";
  async function mount() {
    const buttonSelector = uuidv4() + "button";
    const node = `<button data-UUID=${buttonSelector}>${text}</button>`;
    const attach = document.createElement("div");
    attach.innerHTML = node;
    const element = attach.querySelector(`[data-UUID="${buttonSelector}"]`);
    element.addEventListener("click", onClick);
    return attach;
  }

  function renderTemplate() {
    return `<div data-UUID=${mountSelector}></div>`;
  }

  const render = new Component(mount, renderTemplate, mountSelector);

  return render;
}
