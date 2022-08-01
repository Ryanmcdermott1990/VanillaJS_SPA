import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState, refreshContent} from "../Helpers/state";
import Navbar from "./Navbar";

export default function Posts(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        navbar: new Component(Navbar, false, {
        }),
        
        title: new Component(Title, false, {
            text: "Posts Page"
        }),
        button: new Component(Button, false, {
        }),
    });

    function makeRequest() {

        let req = 'http://localhost:8000/api/posts'
        
        fetch(req).then ((response) => {
            console.log('resolved', response);
            return response.json();
        
        }).then(data => {
        console.log(data);

        }).catch((err) => {
        console.log('rejected', err);
        });
        
        }

    makeRequest();


    const renderTemplate = () => {
        const {title, button, button2, navbar, data} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
            <h1 data-UUID=${title.target}></h1>
            <span data-UUID=${navbar.target}></span>
            <table class="table" id="foo">
                <thead>
                    <th>${data[0].id}</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Content</th>
                    <th>Likes</th>
                    <th>Created-At</th>
                    <th>Updated-At</th>
                </thead>
                <tbody>
                <tbody>
            </table>

                <template id="dataRow">
                <tr>

                </tr>
            </template>

                `).then(() => {
                refreshContent('count', this.expressions, this.node.element)
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}