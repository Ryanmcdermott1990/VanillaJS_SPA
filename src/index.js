import About from "./components/About";
import App from "./components/App";
import "./styles.css";
import {routes} from "./Helpers/routes";
import Component from "./Component";

export function navigate(payload) {
  window.history.pushState(payload.state, "", payload.path);
  getPage();
}

function getPage() {
  const path = window.location.pathname;
  const found = routes.filter((route) => {
    return (route.path === path || !route.exact && path.includes(route.path))
  });
  console.log(found);
    if (found && Array.isArray(found)){
      const componentsArray = found.map(comp => {
        return new Component(comp?.component);
      })
      render(componentsArray);
    }
}

async function render(components) {
  const target = document.querySelector(`[data-UUID="content"]`);
  target.innerHTML = null;
  components.forEach(component => {
    if (component.component){
      new component.component('content', 200);
    }
  })
}

function init() {
  document.getElementById('app').innerHTML = `
    <div id="header">
        <h1>Nested Functional Component Rendering!</h1>
        <div>
          An experiment to render functions as components in a nested fashion.
          Components are rendered asynchronously to allow for the returned html to rely on computed data!
          <strong>(No JSX needed)</strong>
        </div>
        <h3>Render:</h3>
    </div>
    <div data-UUID="content" id="app"></div>
    `;

  function route() {
    function listen() {
      const mount = new Promise(async function (myResolve) {
        window.addEventListener("popstate", () => {
          getPage();
        });
        myResolve();
      });
      return mount;
    }

    listen().then(() => {
      getPage();
    });
  }

  route();
}

init();
