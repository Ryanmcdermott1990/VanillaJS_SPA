import uuidv4 from "./Helpers/uuid";

export default function Component(comp, transition, data) {
    const target = uuidv4();
    return {
        data,
        transition,
        component: comp,
        target: target
    }
}