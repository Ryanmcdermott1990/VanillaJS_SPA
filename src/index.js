import About from "./components/About";
import App from "./components/App";
import "./styles.css";
import {routes} from "./Helpers/routes";

export function navigate(payload) {
  window.history.pushState(payload.state, "", payload.path);
  getPage();
}

function getPage() {
  document.getElementById('app').classList.add('hide');
  const path = window.location.pathname;
  const found = routes.find((route) => route.path === path);
  setTimeout(() => {
    document.getElementById('app').classList.remove('hide');
    if (found){
      render(found?.component);
    }
  }, 200)
}

async function render(component) {
  const target = document.querySelector(`[data-UUID="content"]`);
  target.innerHTML = null;
  if (component){
    await new component('content');
  }
}

function init() {
  document.getElementById('app').innerHTML = `
    <h1>Nested Functional Component Rendering!</h1>
    <div>
      An experiment to render functions as components in a nested fashion.
      Components are rendered asynchronously to allow for the returned html to rely on computed data!
      <strong>(No JSX needed)</strong>
    </div>
    <h3>Render:</h3>
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
