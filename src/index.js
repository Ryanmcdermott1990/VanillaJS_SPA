import About from "./components/About";
import App from "./components/App";
import navigate from "./Helpers/navigate";
import "./styles.css";

function init() {
  document.getElementById("app").innerHTML = `
    <h1>Nested Functional Component Rendering!</h1>
    <div>
      An experiment to render functions as components in a nested fashion.
      Components are rendered asynchronously to allow for the returned html to rely on computed data!
      <strong>(No JSX needed)</strong>
    </div>
    <h3>Render:</h3>
    <div id="content"></div>
    `;
}

async function render(component) {
  const content = await new component();
  if (content) {
    const target = document.getElementById("content");
    target.innerHTML = null;
    target.appendChild(content);
  }
}

function route() {
  const routes = [
    { path: "/", component: App },
    { path: "/about", component: About }
  ];
  function listen() {
    const mount = new Promise(async function (myResolve) {
      window.addEventListener("popstate", (event) => {
        const path = event.target.window.location.pathname;
        const found = routes.find((route) => route.path === path);
        if (found) {
          render(found.component);
        }
      });
      myResolve();
    });
    return mount;
  }

  listen().then(() => {
    navigate({ state: null, path: window.location.pathname });
  });
}

init();
route();
