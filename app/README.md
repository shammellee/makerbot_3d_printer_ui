# Makerbot 3D Printer UI

The desktop software communicates with the printer through JSON notifications.
The shape of the JSON data can change depending on what the printer is doing at
that point in time. The user can also send commands to the printer.

Connect to the mock printer via WebSockets and consume status updates from the
printer, and also send commands to the printer. See the mock printer's README
for usage.

## Example Notifications

```json
{
   "name": "My Awesome Printer",
   "model": "Makerbot",
   "status": {
       "state": "Idle",
   }
}

{
   "name": "My Awesome Printer",
   "model": "Makerbot",
   "status": {
       "state": "Busy",
       "current_process": {
           "name": "PrintProcess",
           "step": "printing",
           "progress": 23,
           "elapsed_time": 3600,
           "time_remaining": 7200,
           "process_methods": [
               "CANCEL",
               "PAUSE"
           ]
       }
   }
}

{
   "name": "My Awesome Printer",
   "model": "Makerbot",
   "status": {
       "state": "Busy",
       "current_process": {
           "name": "PrintProcess",
           "step": "paused",
           "progress": 76,
           "elapsed_time": 7200,
           "time_remaining": 3600,
           "process_methods": [
               "RESUME",
               "CANCEL"
           ]
       }
   }
}

{
   "name": "My Awesome Printer",
   "model": "Makerbot",
   "status": {
       "state": "Idle",
       "current_process": {
           "name": "PrintProcess",
           "step": "done",
           "progress": 100,
           "elapsed_time": 10800,
           "time_remaining": 0,
           "process_methods": [
               "PRINT_AGAIN",
               "DONE"
           ]
       }
   }
}
```

## Setting up project

Download modules:

```
$ npm install
```

Start server:

```
$ npm start
```
