import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";
import Button from "./Button";
import Component from "../Component";
import {navigate} from "../index";


export default function Navbar(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {

        button: new Component(Button, false, {
            callBack: goToHome, text: 'Home'
        }),

        button1: new Component(Button, false, {
            callBack: goToAbout, text: 'About'
        }),

        button2: new Component(Button, false, {
            callBack: goToPosts, text: 'Posts'
        }),

        button3: new Component(Button, false, {
            callBack: goToContact, text: 'Contact'
        }),
        // button2: new Component(Button, false, {
        //     callBack: goToPosts, text: 'Posts'
        // }),
    })

    function goToHome() {
        navigate({state: null, path: '/'} )
    }

    function goToAbout() {
        navigate({state: null, path: '/about'} )
    }

    function goToPosts() {
        navigate({state: null, path: '/posts'} )
    }

    function goToContact() {
        navigate({state: null, path: '/contact'} )
    }

    const renderTemplate = () => {
        const {button, button1, button2, button3} = this.node.children;
        return new Promise(async (myResolve) => {
          this.node.setHTML(`
                    <span data-UUID=${button.target}></span>
                    <span data-UUID=${button1.target}></span>
                    <span data-UUID=${button2.target}></span>
                    <span data-UUID=${button3.target}></span>`
                    ).then(() => {
            // this.node.element.querySelector(`[data-UUID="${id}"]`).addEventListener('click', data.callBack);
            this.node.renderChildren();
            myResolve();
          })
        });
      }

    return renderTemplate();
}