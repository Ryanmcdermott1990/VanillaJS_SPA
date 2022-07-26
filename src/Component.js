import uuidv4 from "./Helpers/uuid";

export default function Component(comp){
    const target = uuidv4();
    return {
        component: comp,
        target: target
    }
}