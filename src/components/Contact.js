import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import { createState, refreshContent } from "../Helpers/state";
import Navbar from "./Navbar";

export default function Contact(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        navbar: new Component(Navbar, false, {
        }),

        title: new Component(Title, false, {
            text: "Contact Page"
        }),
        button: new Component(Button, false, {
        }),
    });

    const renderTemplate = () => {
        const { title, button, button2, navbar } = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                    <h3 data-UUID=${title.target}></h3>
                `).then(() => {
                refreshContent('count', this.expressions, this.node.element)
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}