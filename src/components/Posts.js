import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState, refreshContent} from "../Helpers/state";
import Navbar from "./Navbar";
import Table from "./Table";
import Post from './Post';

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000/api/posts");

export default function Posts(mountPoint, transition) {
    this.node = new DOMNode(mountPoint, transition, {
        navbar: new Component(Navbar, false, {
        }),
        
        title: new Component(Title, false, {
            text: "Posts Page"
        }),
        button: new Component(Button, false, {
        }),

        table: new Component(Table, false),

        post: new Component(Post, false)

    });

    const renderTemplate = () => {
        
        const {title, button, button2, navbar, data, table, post} = this.node.children;
        return new Promise(async (myResolve) => {
            this.node.setHTML(`
            <h3 data-UUID=${title.target}></h3>
            <div data-UUID =${table.target}></div>
            <div data-UUID=${post.target}></div>
                `).then(() => {
                this.node.renderChildren();
                myResolve();
            })
        });
    }

    return renderTemplate();
}