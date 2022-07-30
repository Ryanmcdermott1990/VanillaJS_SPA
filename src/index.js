import About from "./components/About";
import App from "./components/App";
import "./styles.css";
import {routes} from "./Helpers/routes";
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
  if (found && Array.isArray(found)){
    console.log("I am here");
      const componentsArray = found.map(comp => {
        return new Component(comp?.component);
      })
      render(componentsArray);
    }
    else {
      console.log("I am there");
      navigate({state: null, path: '/'} )
    }
  
}

export default function Index(mountPoint, transition) {
  this.node = new DOMNode(mountPoint, transition, {
      app: new Component(App, false, {
      }),
      });
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
  // const {app} = this.node.children;
  document.getElementById('app').innerHTML = `
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
