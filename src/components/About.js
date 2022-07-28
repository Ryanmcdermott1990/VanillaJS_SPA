import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState} from "../Helpers/state";

export default function About(mountPoint, transition) {
    let state = createState({
        count : 0
    }, alert)
    const changeState = () => {
        state.count = state.count + 1
    }

    this.node = new DOMNode(mountPoint, transition, {
        title: new Component(Title, false, {
            text: 'This is the About page!'
        }),
        button: new Component(Button, false, {
            callBack: changeState, text: 'Increase counter'
        })
    });

    const renderTemplate = () => {
        const {title, button} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                    <span data-UUID=${title.target}></span>
                    <p>Count: <strong>${state.count}</strong></p>
                    <span data-UUID=${button.target}></span>
                `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
