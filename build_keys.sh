#!/bin/bash
if [ -z "$GOOGLE_API_KEY" ]; then
  echo "Error: GOOGLE_API_KEY was not set!" 1>&2
  exit 1
else
  _GOOGLE_API_KEY=$GOOGLE_API_KEY
fi

if [ -z "$MAPBOX_API_KEY" ]; then
  echo "Error: MAPBOX_API_KEY was not set!" 1>&2
  exit 1
else
  _MAPBOX_API_KEY=$MAPBOX_API_KEY
fi

printf "export const GOOGLE_API_KEY = '${_GOOGLE_API_KEY}';\nexport const MAPBOX_API_KEY = '${_MAPBOX_API_KEY}';" > env.js
echo "Successfully built API keys => env.js"
