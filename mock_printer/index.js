"use strict";

const io = require("socket.io").listen(8080, { origins: "*" });

const { PRINT_TIME, statuses, actions, allowedActions } = require("./constants");
const { update, marshalState } = require("./stateUtils");

let state = {
  status: statuses.IDLE,
  progress: 0,
  elapsed_time: 0,
  time_remaining: PRINT_TIME
};

io.set("origins", "http://localhost:8000");

io.on("connection", ws => {
  console.log("PRINTER CONNECTED");

  ws.on("message", msg => {
    if(!allowedActions[state.status] ||
      !allowedActions[state.status].includes(msg))
      return io.send(
        JSON.stringify({
          error: `Action: ${msg} not allowed for status: ${state.status}`
      }));

      switch (msg) {
        case actions.PRINT:
        case actions.RESUME:
          state = update(state, statuses.BUSY);
          break;
        case actions.CANCEL:
          state = update(state, statuses.CANCELLED);
          break;
        case actions.PAUSE:
          state = update(state, statuses.PAUSED);
          break;
        case actions.DONE:
          state = update(state, statuses.DONE);
          break;
        case actions.PRINT_AGAIN:
          state = update(state, statuses.PRINT_AGAIN);
          break;
        default:
          break;
      }
  });

  const timer = setInterval(() => {
      if(state.status === statuses.BUSY)
          state = update(state, statuses.BUSY);
      console.log(marshalState(state));
      ws.send(marshalState(state));
  },
  1000);

  ws.on('disconnect', msg => {
    console.log('PRINTER DISCONNECTED', msg);
    clearInterval(timer);
  });
});

io.on("error", err => console.log(err));
