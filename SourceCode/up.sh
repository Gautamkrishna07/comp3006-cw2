#!/bin/bash

docker compose up -d --build
echo "Frontend: http://localhost:81"
echo "Backend:  http://localhost:82"
echo "MongoDB:  http://localhost:83"

docker compose logs -f
