export default function DOMNode(mountPoint, components = null) {
    this.element = document.querySelector(`[data-UUID="${mountPoint}"]`);
    this.setHTML = function (markup) {
        this.element.innerHTML = markup;
    }
    this.renderChildren = () => {}
    if (components && Object.entries(components)) {
        this.children = components;
        this.renderChildren = () => {
            Object.values(this.children).forEach(child => {
                console.log(child);
                const element = this.element.querySelector(`[data-UUID="${child.target}"]`);
                if (element){
                    child.component(child.target, child.data)
                }
            })
        }
    }
    return this;
}