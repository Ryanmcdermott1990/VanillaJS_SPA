import uuidv4 from "../Helpers/uuid";
import DOMNode from "../Helpers/elements";


export default function Title(mountPoint, data) {
    this.node = new DOMNode(mountPoint);

    const renderTemplate = () => {
        return new Promise(async (myResolve) => {
            const id = uuidv4();
            this.node.setHTML(`
                <h2 data-UUID=${id}>${data.text}</h2>`);
            myResolve();
        });
    }

    return renderTemplate();
}
