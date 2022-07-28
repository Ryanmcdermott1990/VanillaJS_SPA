export const createState = (state, expressions, template) => {
    const refreshContent = () => {
        const refreshElements = template.querySelectorAll(`[data-state="count"]`);
        if (refreshElements) {
            refreshElements.forEach(element => {
                element.innerHTML = expressions[element.getAttribute('content-func')]();
            })
        }
    }
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value;
            refreshContent();
            return true;
        }
    });
};