export default function DOMNode(mountPoint, transition, components = null) {
    this.element = document.querySelector(`[data-UUID="${mountPoint}"]`);
    this.element.classList.add('active');
    this.setHTML = (markup) => new Promise(async (myResolve) => {
        if (transition) {
            this.element.classList.add('hide');
            setTimeout(() => {
                this.element.classList.remove('hide');
                this.element.innerHTML = markup;
                myResolve();
            }, transition)
        } else {
            this.element.innerHTML = markup;
            myResolve();
        }
    })
    this.renderChildren = () => {}
    if (components && Object.entries(components)) {
        this.children = components;
        this.renderChildren = () => {
            Object.values(this.children).forEach(child => {
                const element = this.element.querySelector(`[data-UUID="${child.target}"]`);
                if (element){
                    child.component(child.target, child.transition, child.data)
                }
            })
        }
    }
    return this;
}