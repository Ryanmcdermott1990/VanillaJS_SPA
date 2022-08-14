import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import { addEffect, createState } from "../Helpers/state";
import Navbar from "./Navbar";
import Table from "./Table";

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", `http://localhost:8000/api/posts/${2}`);


export default function Post(mountPoint, transition, data) {
    const api_url = `http://localhost:8000/api/posts/${2}`;
    this.node = new DOMNode(mountPoint, transition, {

        table: new Component(Table, false, data, {


        })
    })

    this.node.expressions = {
        statePost: () => `<h1>Post Content</h1> 
    ${`       
           <h1>${postState.post.title}</h1>
           <p>${postState.post.content}</p>`
            }
    `

    }

    let postState = this.node.createState({
        post: {}
    })

    async function getapi(url) {
        const response = await fetch(url);
        postState.post = await response.json();
        console.log("this is the post state", postState.post)


    }

    const renderTemplate = () => {
        const { table } = this.node.children;

        return new Promise(async (myResolve) => {

            this.node.setHTML(`
            <div state="post" template="statePost"> </div>
            `
            ).then(() => {
                this.node.renderChildren();
                console.log(this.node.expressions, this.node.element);
                getapi(api_url);
                myResolve();


            })
        });
    }
    return renderTemplate();
}


