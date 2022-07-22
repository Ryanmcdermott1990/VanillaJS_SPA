export default function Component(mount, renderTemplate, selector) {
  const attach = document.createElement("div");

  attach.innerHTML = renderTemplate();

  function create(func) {
    const mount = new Promise(async function (myResolve) {
      const render = func();
      myResolve(render);
    });
    return mount;
  }

  function render() {
    const dom = attach;
    create(mount).then((comp) => {
      if (comp) {
        dom.querySelector(`[data-UUID="${selector}"]`).appendChild(comp);
      }
    });
    return dom;
  }

  return render();
}
