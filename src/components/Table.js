import DOMNode from "../Helpers/elements";
import {createState, refreshContent} from "../Helpers/state";
import uuidv4 from "../Helpers/uuid";


const api_url = "http://localhost:8000/api/posts";


export default function Table(mountPoint, transition, data) {
        this.node = new DOMNode(mountPoint, transition)     

            this.expressions = {
                table: () => `
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Content</th>
                    <th>Likes</th>
                    <th>Created-At</th>
                    <th>Updated-At</th>
                </tr>
                ${
                    Array.isArray(state.data) && state.data.map(r => 
                        `<tr> 
                        <td>${r.id}</td>
                        <td>${r.title}</td>
                        <td>${r.slug}</td> 
                        <td>${r.content}</td> 
                        <td>${r.likes}</td> 
                        <td>${r.created_at}</td> 
                        <td>${r.updated_at}</td>          
                        </tr>`
  
                    ).join('')
                }
                `
            }

            let state = createState({
                data: []
            },
            this.expressions,
            this.node.element
        )
        async function getapi(url) {
            const response = await fetch(url);
            state.data = await response.json();
            console.log("state", state.data)

            }  
 
        const renderTemplate = () => {
            return new Promise(async (myResolve) => {
                this.node.setHTML(`
                    <table state="data" template="table"/>
                    `
                    ).then(() => {
                    this.node.renderChildren();
                getapi(api_url);
                    console.log(this.expressions, this.node.element);
                    myResolve();
                })
            });
        }
    
        return renderTemplate();
    }
