import DOMNode, { sanitizeHTML } from "../Helpers/elements";
import uuidv4 from "../Helpers/uuid";
import { addEffect, createState } from "../Helpers/state";
import Title from "./Title";
import { convertCompilerOptionsFromJson } from "typescript";

const api_url = "http://localhost:8000/api/posts";


export default function Table(mountPoint, transition, data) {
    this.node = new DOMNode(mountPoint, transition)

    this.node.expressions = {
        table: () => `
                    <tr style="border: 1px solid black">
                    <th style="border: 1px solid black">ID</th>
                    <th style="border: 1px solid black">Title</th>
                    <th style="border: 1px solid black">Slug</th>
                    <th style="border: 1px solid black">Content</th>
                    <th style="border: 1px solid black">Likes</th>
                    <th style="border: 1px solid black">Created-At</th>
                    <th style="border: 1px solid black">Updated-At</th>
                </tr>
                ${Array.isArray(filterState.data) && filterState.data.map((r, i) => {
            return (`<tr style="border: 1px solid black"> 
                        <td style="border: 1px solid black">${r.id}</td>
                        <td style="border: 1px solid black">${r.title}</td>
                        <td style="border: 1px solid black">${r.slug}</td> 
                        <td style="border: 1px solid black">${r.content}</td> 
                        <td style="border: 1px solid black">${r.likes}</td> 
                        <td style="border: 1px solid black">${r.created_at}</td> 
                        <td style="border: 1px solid black">${r.updated_at}</td>          
                        </tr>
                        `)
        }
        ).join('')
            }
                `
    }

    let postsState = this.node.createState({
        data: []
    });

    let filterState = this.node.createState({
        data: []
    });

    let textState = this.node.createState({
        text: { name: null, body: null }
    });

    postsState = addEffect(postsState, 'data', () => console.log('change posts'))
    textState = addEffect(textState, 'text', () => search())

    const search = () => {
        if (Array.isArray(postsState.data)) {
            console.log("I AM posts state", postsState.data)
            const filtered = postsState.data.filter(post => {
                console.log("I AM post title", post.title)
                return textState.text.includes(post.title)

            })

            console.log("I AM TEXT", textState.text)

            filterState.data = filtered
            console.log("I AM filtered list", filtered)

        } 
    }

    const handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        console.log(value); 
        textState.text = value;
    }

    function setText(e, field) {
        const newState = { ...textState.text }
        newState[field] = sanitizeHTML(e.target.value);
        textState.text = newState;
    }


    async function getapi(url) {
        const response = await fetch(url);
         const res = await response.json();
         postsState.data = res;
         filterState.data = res;
        console.log("state", postsState.data)

    }

    const renderTemplate = () => {
        return new Promise(async (myResolve) => {
            const titleId = uuidv4();
            this.node.setHTML(`
            <div class="searchContainer">    
            <label>🔎</label>
                <input data-UUID="${titleId}"></input>
                </div>
                    <table style="border: 1px solid black" state="data" template="table"></table>
                    `
            ).then(() => {
                this.node.getElement(titleId).addEventListener('keyup', (e) => handleChange(e, '🔎'));
                this.node.renderChildren();
                getapi(api_url);
                console.log("I AM HERE", this.node.expressions, this.node.element);
                myResolve();
            })
        });
    }

    return renderTemplate();
}
