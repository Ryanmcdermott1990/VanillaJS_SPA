import Component from "../Component";
import navigate from "../Helpers/navigate";
import uuidv4 from "../Helpers/uuid";
import Button from "./Button";

export default function App() {
  const mountSelector = uuidv4() + "mountPoint";

  async function mount() {
    // function clickFunction() {
    //   navigate({ state: null, path: "/about" });
    // }
    // const nestedComp = await new Button("Go to about page", clickFunction);
    // return nestedComp;
  }

  function renderTemplate() {
    return `
              <div>
                <h2>This is the App.js Component</h2>
                <h4>Below is a component mounted to the custom mount-point: ${mountSelector}</h4>
                <span data-UUID=${mountSelector}></span>
              <div>`;
  }

  const render = new Component(mount, renderTemplate, mountSelector);

  return render;
}
