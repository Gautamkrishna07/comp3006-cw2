#!/bin/bash

docker compose up -d --build
echo "Frontend: http://localhost:81"
echo "Backend:  http://localhost:82"

docker compose logs -f
