#!/bin/sh

echo "Waiting for MongoDB at $DATABASE..."

max_retries=20
count=0
until nc -z mongo 27017; do
  echo "Waiting for MongoDB to be ready..."
  sleep 2
  count=$((count + 1))
  if [ $count -ge $max_retries ]; then
    echo "❌ MongoDB not reachable after $max_retries attempts. Exiting."
    exit 1
  fi
done

echo "MongoDB is up. Running setup..."

npm run setup && npm run start
