import About from "./components/About";
import App from "./components/App";
import "./styles.css";
import { routes } from "./Helpers/routes";
import Component from "./Component";
import Navbar from "./components/Navbar";
import Title from "./components/Title";

export function navigate(payload) {
  window.history.pushState(payload.state, "", payload.path);
  getPage();
}

function getPage() {

  const path = window.location.pathname;
  const found = routes.filter((route) => {

    return (route.path === path || !route.exact && path.includes(route.path))
  });
  if (found && Array.isArray(found) && found.length > 0) {
    const componentsArray = found.map(comp => {
      return { create: new Component(comp?.component), mountPoint: comp.mountPoint };
    })
    render(componentsArray);
  }
  else {
    console.log("I am there");
    navigate({ state: null, path: '/' })
  }
}


async function render(components) {
  components.forEach(component => {
    let mount = 'content';
    if (component.mountPoint) {
      mount = component.mountPoint;
    }

    const target = document.querySelector(`[data-UUID=${mount}]`);
    target.innerHTML = null;
    if (component.create.component) {
      new component.create.component(mount, 200);
    }
  })
}

function init() {
  document.getElementById('app').innerHTML = `
  <h1>Personal SPA</h1> 
  <div data-UUID="static"></div>
    <div data-UUID="content" id="app"></div>
    `;

  render([{ mountPoint: 'static', create: new Component(Navbar, false) }])

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
