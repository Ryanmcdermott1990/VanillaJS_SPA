import navigate from "../Helpers/navigate";
import uuidv4 from "../Helpers/uuid";


export default function Button(mountPoint, callback) {
console.log(mountPoint)
  function renderTemplate() {
    return new Promise(async function (myResolve) {
      const button = {
        target: uuidv4()
      }
      const attach = document.querySelector(`[data-UUID="${mountPoint}"]`);
      attach.innerHTML = `
                <button data-UUID=${button.target}></button>`;
      attach.querySelector(`[data-UUID="${button.target}"]`).addEventListener('click', callback);
      myResolve(attach);
    });
  }

  return renderTemplate();
}
