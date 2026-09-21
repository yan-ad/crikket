#!/bin/sh

set -eu

APP_NAME="${SAFARI_APP_NAME:-Crikket}"
BUNDLE_IDENTIFIER="${SAFARI_BUNDLE_IDENTIFIER:-io.crikket.safari}"

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
  --app-name "$APP_NAME" \
  --bundle-identifier "$BUNDLE_IDENTIFIER" \
  --swift \
  --macos-only \
  --copy-resources \
  --no-open \
  --no-prompt \
  --force
