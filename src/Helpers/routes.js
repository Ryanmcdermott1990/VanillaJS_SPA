import App from "../components/App";
import About from "../components/About";

export const routes = [
  { path: "/", component: App, exact: true },
  { path: "/about", component: About, exact: true }
];
