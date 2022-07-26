import uuidv4 from "./Helpers/uuid";

export default function Component(comp, data) {
    const target = uuidv4();
    console.log(target)
    return {
        data,
        component: comp,
        target: target
    }
}