import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState} from "../Helpers/state";

export default function About(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        title: new Component(Title, false, {
            text: 'This is the About page!'
        }),
        button: new Component(Button, false, {
            callBack: changeState, text: 'Increase counter'
        })
    });

    let state = createState({
            count: 0
        },
        () =>  {
            const refreshElement = this.node.element.querySelector(`[data-state="count"]`);
            refreshElement.innerHTML = contentObj[refreshElement.getAttribute('content-func')]();
        }
    )

    function changeState() {
        state.count = state.count + 1
    }

    const contentObj = {
        stateCount: () => `Count: <strong>${state.count}`
    }

    const renderTemplate = () => {
        const {title, button} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
                    <span data-UUID=${title.target}></span>
                    <p data-state="count" content-func="stateCount">${contentObj["stateCount"]()}</strong></p>
                    <span data-UUID=${button.target}></span>
                `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}
