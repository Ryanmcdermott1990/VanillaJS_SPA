import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState, refreshContent} from "../Helpers/state";
import Navbar from "./Navbar";

export default function About(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        navbar: new Component(Navbar, false, {
        }),
        
        title: new Component(Title, false, {
            text: "About Page"
        }),
        button: new Component(Button, false, {
            callBack: changeState, text: 'Increase counter'
        }),
        button2: new Component(Button, false, {
            callBack: alertCount, text: 'Alert Count'
        })
    });

    this.expressions = {
        stateCount: () => `Count: <strong>${state.count}`
    }

    let state = createState({
            count: 0
        },
        this.expressions,
        this.node.element
    )

    function changeState() {
        state.count = state.count + 1
    }

    function alertCount() {
        alert(state.count);
    }

    const renderTemplate = () => {
        const {title, button, button2, navbar} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                    <h3 data-UUID=${title.target}></h3>
                    <p state="count" template="stateCount"></strong></p>
                    <span data-UUID=${button.target}></span>
                    <span data-UUID=${button2.target}></span>
                `).then(() => {
                refreshContent('count', this.expressions, this.node.element)
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
