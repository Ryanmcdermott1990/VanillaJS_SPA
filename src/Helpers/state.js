export const createState = (state, render) => {
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value; // default set behaviour
            render(target[property]); // updates the view everytime the state changes
            return true;
        }
    });
};