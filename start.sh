#!/bin/sh
# Serve the demo at http://localhost:8000 (ES modules do not load over file://).
cd "$(dirname "$0")" && python3 -m http.server 8000
