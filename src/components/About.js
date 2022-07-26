import Button from "./Button";
import navigate from "../Helpers/routes";
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
        const {title} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <span data-UUID=${title.target}></span>`);
            this.node.renderChildren();
            myResolve();
        });
    }

    return renderTemplate();
}
