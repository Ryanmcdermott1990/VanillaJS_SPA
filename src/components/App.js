import uuidv4 from "../Helpers/uuid";
import Button from "./Button";
import navigate from "../Helpers/navigate";
import Component from "../Component";
import DOMNode from "../Helpers/elements";

export default function App(mountPoint) {
    const node = new DOMNode(mountPoint);

    function renderTemplate() {
        function goToAbout() {
            navigate({state: null, path: '/test'} )
        }
        return new Promise(async function (myResolve) {
            const button = new Component(Button);
            const components = [
                button
            ]
            node.setHTML(`
                <h2>This is the App.js Component</h2>
                <h4>Below is a component mounted to the custom mount-point: ${mountPoint}</h4>
                <span data-UUID=${button.target}></span>`);
            components.forEach(comp => {
                const element = node.element.querySelector(`[data-UUID="${comp.target}"]`);
                if (element){
                    comp.component(comp.target, goToAbout, 'Go to About page')
                }
            })
            myResolve();
        });
    }

    return renderTemplate();
}
