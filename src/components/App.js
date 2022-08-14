import Button from "./Button";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import { navigate } from "../index";
import Navbar from "./Navbar";

export default function App(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        navbar: new Component(Navbar, false, {
        }),
        title: new Component(Title, false, {
            text: 'Home Page'
        })
    });

    const renderTemplate = () => {
        const { navbar, title } = this.node.children;
        console.log(navbar);
        console.log(navbar.target);
        return new Promise(async (myResolve) => {
            console.log("this is this", this)
            this.node.setHTML(`
                <h3 data-UUID=${title.target}></h3>
                `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();

}




