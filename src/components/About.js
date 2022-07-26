import Button from "./Button";
import navigate from "../Helpers/navigate";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";

export default function About(mountPoint) {
    this.node = new DOMNode(mountPoint, {
        title: new Component(Title, {
            text: 'This is the About page!'
        })
    });

    const renderTemplate = () => {
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <span data-UUID=${this.node.children.title.target}></span>`);
            this.node.renderChildren();
            myResolve();
        });
    }

    return renderTemplate();
}
