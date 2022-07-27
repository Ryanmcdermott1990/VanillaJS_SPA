import Button from "./Button";
import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import {navigate} from "../index";

export default function App(mountPoint, transition) {
    console.log(transition);
    this.node = new DOMNode(mountPoint, transition, {
        button: new Component(Button, false, {
            callBack: goToAbout, text: 'Go to about page'
        }),
        title: new Component(Title, false, {
            text: 'Try clicking the button below!'
        })
    });

    function goToAbout() {
        navigate({state: null, path: '/about'} )
    }

    const renderTemplate = () => {
        const {button, title} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                <h2>This is the App.js Component</h2>
                <h4>Below is a component mounted to the custom mount-point: ${mountPoint}</h4>
                <div data-UUID="${title.target}"></div>
                <span data-UUID=${button.target}></span>`).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
