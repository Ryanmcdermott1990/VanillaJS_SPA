import uuidv4 from "../Helpers/uuid";
import Button from "./Button";
import navigate from "../Helpers/navigate";

export default function App(mountPoint) {

    function renderTemplate() {
        function goToAbout() {
            navigate({state: null, path: '/test'} )
        }
        return new Promise(async function (myResolve) {
            const ButtonWrap = () => {
                const target = uuidv4();
                return {
                 comp: Button,
                 target: target
                }
            }
            const button = ButtonWrap();
            const components = [
                button
            ]
            const attach = document.querySelector(`[data-UUID="${mountPoint}"]`);
            attach.innerHTML = `
                <h2>This is the App.js Component</h2>
                <h4>Below is a component mounted to the custom mount-point: ${mountPoint}</h4>
                <span data-UUID=${button.target}></span>`;
            components.forEach(comp => {
                const node = attach.querySelector(`[data-UUID="${comp.target}"]`);
                console.log(comp.target)
                if (node){
                    comp.comp(comp.target, goToAbout).then(replace => node.replaceWith(replace));
                }
            })
            console.log("HERE", attach)
            myResolve(attach);
        });
    }

    return renderTemplate();
}
