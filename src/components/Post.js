import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState, refreshContent} from "../Helpers/state";
import Navbar from "./Navbar";
import Table from "./Table";

const api_url = "http://localhost:8000/api/posts";


export default function Post(mountPoint, transition, data) {
    this.node = new DOMNode(mountPoint, transition, {

    table: new Component(Table, false, data, {


    })
})


this.expressions = {
    statePost: () => `Post Content  
    ${
        Array.isArray(state.posts) && state.posts.filter((s) => s.id === 2).map(s => 
            `
           
           <h1> ${s.id} </h1>
           <h1> ${s.title}</h1>
           <p>${s.content}</p>`    

        )
    }
    `

}




let state = createState({
    posts: []
    },
    this.expressions,
    this.node.element
)

// function renderResult() {
// let yourDesiredContentId = 2;
// let result = state.posts.filter(el => el.id === yourDesiredContentId);
// return result;
// }

// function changeState() {
//     // Create a form with the following elements 
//     // id, title, content, likes, updated_at, created_at
//     // On the form being submistted there is a post request to the db and this will re-render the table 

// }

// async function getapi2(url) {
//     const response = await fetch(url);
//     state.data = await response.json();
//     console.log("This is state data", state.post)

//     }

async function getapi(url) {
    const response = await fetch(url);
    state.posts = await response.json();
    console.log("this is the post state", state.posts)


}


const getOnlyArray = (id) => {
    // this will return only item which match the provided id
    return state.posts.filter((s) => s.id === id)
}

getOnlyArray(1)

const renderTemplate = () => {
    const {table} = this.node.children;
    
    

    return new Promise(async (myResolve) => {

        this.node.setHTML(`
            <div state="posts" template="statePost"> </div>
            `
            ).then(() => {
            this.node.renderChildren();
            console.log(this.expressions, this.node.element);
            getapi(api_url);
            myResolve();
           
            
        })
    });
}
return renderTemplate();
}


