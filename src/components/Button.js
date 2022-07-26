import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";


export default function Button(mountPoint, data) {
  this.node = new DOMNode(mountPoint);

  const renderTemplate = () => {
    return new Promise(async (myResolve) => {
      const id = uuidv4();
      this.node.setHTML(`
                <button data-UUID=${id}>${data.text}</button>`);
      this.node.element.querySelector(`[data-UUID="${id}"]`).addEventListener('click', data.callBack);
      myResolve();
    });
  }

  return renderTemplate();
}
