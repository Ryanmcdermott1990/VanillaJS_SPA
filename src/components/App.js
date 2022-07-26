import Button from "./Button";
import navigate from "../Helpers/navigate";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";

export default function App(mountPoint) {
    this.node = new DOMNode(mountPoint, {
        button: new Component(Button, {
            callBack: goToAbout, text: 'Go to about page'
        }),
        title: new Component(Title, {
            text: 'Try clicking the button below!'
        })
    });

    function goToAbout() {
        navigate({state: null, path: '/about'} )
    }

    const renderTemplate = () => {
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <h2>This is the App.js Component</h2>
                <h4>Below is a component mounted to the custom mount-point: ${mountPoint}</h4>
                <div data-UUID="${this.node.children.title.target}"></div>
                <span data-UUID=${this.node.children.button.target}></span>`);
            this.node.renderChildren();
            myResolve();
        });
    }

    return renderTemplate();
}
