import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";


export default function Button(mountPoint, callback, text) {
  const node = new DOMNode(mountPoint);

  function renderTemplate() {
    return new Promise(async function (myResolve) {
      const id = uuidv4();
      node.setHTML(`
                <button data-UUID=${id}>${text}</button>`);
      node.element.querySelector(`[data-UUID="${id}"]`).addEventListener('click', callback);
      myResolve();
    });
  }

  return renderTemplate();
}
