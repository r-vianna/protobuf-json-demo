const state = {
    inprogress: false
};
const stateChangeEvents = {};

function executeChangeEvents() {
    Object.keys(stateChangeEvents).forEach((key) => {
        stateChangeEvents[key]();
    });
}

function registerChangeEvent(func) {
    const key = Object.keys(stateChangeEvents).length;
    stateChangeEvents[key] = func;
}

function setState() {
    this.inprogress = () => {
        if (state.inprogress) { return; }
        state.inprogress = true;
        executeChangeEvents();
    };

    this.complete = () => {
        if (!state.inprogress) { return; }
        state.inprogress = false;
        executeChangeEvents();
    };
    return this;
}

function getState() {
    return state.inprogress;
}

export default {
    getState,
    setState,
    registerChangeEvent
};
