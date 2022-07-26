export default function DOMNode(mountPoint) {
    this.element = document.querySelector(`[data-UUID="${mountPoint}"]`);
    this.setHTML = function (markup) {
        this.element.innerHTML = markup;
    }
    return this;
}