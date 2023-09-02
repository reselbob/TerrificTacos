#!/usr/bin/env bash

echo "Deleting the old event.log.\n"
rm -rf /data/events.log

echo "Spinning up web server.\n"
ts-node src/WebServer.ts &
WEB_PID=$!

sleep 5 # Take a break so the web server can spin up

echo "\nRunning the Restaurant Manager to create some orders for many restaurants.\n"
ts-node src/RestaurantManager.ts

sleep 5 # Leave the web server running so that the Restaurant Manager can do its thing

echo "\nRunning the Workflow Player to recreate the workflow\n"
ts-node src/WorkflowPlayer.ts

echo "\nKilling process $WEB_PID that's running the web server\n"
kill $WEB_PID


