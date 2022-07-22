import Component from "../Component";
import uuidv4 from "../Helpers/uuid";
import Button from "./Button";

export default function About() {
  const mountSelector = uuidv4() + "mountPoint";

  async function mount() {
    function clickFunction() {
      window.history.back();
    }
    const nestedComp = await new Button("Go back", clickFunction);
    return nestedComp;
  }

  function renderTemplate() {
    return `
              <div>
                <h2>This is the About.js Component</h2>
                <p>There is no information here yet</p>
                <span data-UUID=${mountSelector}></span>
              <div>`;
  }

  const render = new Component(mount, renderTemplate, mountSelector);

  return render;
}
