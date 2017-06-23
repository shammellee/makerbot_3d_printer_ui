"use strict";

const PRINT_TIME = 30 * 1000; // 30 seconds

const statuses = Object.freeze({
    IDLE: "Idle",
    BUSY: "Busy",
    PAUSED: "Paused",
    DONE: "Done",
    CANCELLED: "CANCELLED",
    PRINT_AGAIN: "PRINT_AGAIN"
});

const actions = Object.freeze({
    PRINT: "PRINT",
    CANCEL: "CANCEL",
    PAUSE: "PAUSE",
    RESUME: "RESUME",
    DONE: "DONE",
    PRINT_AGAIN: "PRINT_AGAIN"
});

const allowedActions = {
    [statuses.IDLE]: [ actions.PRINT ],
    [statuses.CANCELLED]: [ actions.PRINT ],
    [statuses.BUSY]: [
        actions.PAUSE,
        actions.CANCEL
    ],
    [statuses.PAUSED]: [
        actions.RESUME,
        actions.CANCEL
    ],
    [statuses.DONE]: [
        actions.PRINT_AGAIN,
        actions.DONE
    ]
};


module.exports = { PRINT_TIME, statuses, actions, allowedActions };
