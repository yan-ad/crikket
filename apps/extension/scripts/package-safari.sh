#!/bin/sh

set -eu

PACKAGER=""
if xcrun --find safari-web-extension-packager >/dev/null 2>&1; then
  PACKAGER="safari-web-extension-packager"
elif xcrun --find safari-web-extension-converter >/dev/null 2>&1; then
  PACKAGER="safari-web-extension-converter"
else
  echo "Safari packaging requires full Xcode with Safari Web Extension tooling."
  echo "Install Xcode, then select it with: sudo xcode-select -s /Applications/Xcode.app"
  exit 1
fi

xcrun "$PACKAGER" \
  .output/safari-mv3 \
  --project-location .output/safari-xcode \
  --app-name Crikket \
  --bundle-identifier io.crikket.safari \
  --swift \
  --macos-only \
  --copy-resources \
  --no-open \
  --no-prompt \
  --force
