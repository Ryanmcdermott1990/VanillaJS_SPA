import App from "../components/App";
import About from "../components/About";
import Posts from "../components/Posts";
import Contact from "../components/Contact";


export const routes = [
  { path: "/", component: App, exact: true },
  { path: "/about", component: About, exact: true },
  { path: "/posts", component: Posts, exact: true },
  { path: "/contact", component: Contact, exact: true }


];
