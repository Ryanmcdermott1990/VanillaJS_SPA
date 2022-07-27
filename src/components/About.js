import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";

export default function About(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, false, {
        title: new Component(Title, transition, {
            text: 'This is the About page!'
        })
    });

    const renderTemplate = () => {
        const {title} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <span data-UUID=${title.target}></span>`).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
