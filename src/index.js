import About from "./components/About";
import App from "./components/App";
import navigate from "./Helpers/navigate";
import "./styles.css";

function init() {
  document.getElementById('app').innerHTML = `
    <h1>Nested Functional Component Rendering!</h1>
    <div>
      An experiment to render functions as components in a nested fashion.
      Components are rendered asynchronously to allow for the returned html to rely on computed data!
      <strong>(No JSX needed)</strong>
    </div>
    <h3>Render:</h3>
    <div data-UUID="content"></div>
    `;

  async function render(component) {
    const target = document.querySelector(`[data-UUID="content"]`);
    console.log(target);
    target.innerHTML = null;
    if (component){
      const content = await new component('content');
      if (content) {
        console.log(content);
        target.replaceWith(content);
      }
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
            render(found?.component);
        });
        myResolve();
      });
      return mount;
    }

    listen().then(() => {
      navigate({ state: null, path: window.location.pathname });
    });
  }

  route();
}

init();
