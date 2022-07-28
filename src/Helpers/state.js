export const createState = (state, expressions, template) => {
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value;
            refreshContent(Object.keys(state)[0], expressions, template);
            return true;
        }
    });
};

export const refreshContent = (state, expressions, template) => {
    const refreshElements = template.querySelectorAll(`[state="${state}"]`);
    if (refreshElements) {
        refreshElements.forEach(element => {
            element.innerHTML = expressions[element.getAttribute('template')]();
        })
    }
}