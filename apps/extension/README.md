# WXT + React

Release tagging and generated browser artifacts are documented in
[`RELEASE.md`](./RELEASE.md).

## Development

```bash
bun run --filter extension dev
bun run --filter extension dev:firefox
```

Firefox uses Manifest V3 and opens a native capture picker for video because it
does not provide Chromium's `tabCapture` API. Screenshots still capture the
active tab directly.

Safari uses the same native window/screen picker for video. Keyboard shortcut
commands are omitted because Safari does not provide the same extension command
management flow as Chrome and Firefox.

### Test an unsigned Firefox build

Firefox Release and Beta reject unsigned ZIP/XPI files with a “not verified”
message. For local development, load the extension temporarily instead:

```bash
bun run --filter extension test:firefox
```

This launches Firefox with the extension temporarily installed. Alternatively:

1. Run `bun run --filter extension build:firefox`.
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. Click **Load Temporary Add-on**.
4. Select `.output/firefox-mv3/manifest.json`.

Temporary add-ons are removed when Firefox restarts.

## Production builds

```bash
bun run --filter extension build
bun run --filter extension build:firefox
```

`zip:firefox` creates an unsigned package. It cannot be installed permanently in
Firefox Release or Beta until Mozilla signs it.

### Create a signed Firefox package

Create API credentials in the Mozilla Add-ons Developer Hub, then run:

```bash
export WEB_EXT_API_KEY="user:..."
export WEB_EXT_API_SECRET="..."
bun run --filter extension sign:firefox
```

The command submits the build as an unlisted add-on and downloads the signed
XPI into `.output/firefox-signed`. Keep both credentials out of source control.

## Safari

Build the Safari WebExtension assets:

```bash
bun run --filter extension build:safari
```

Safari extensions must be packaged inside a native app. Install full Xcode,
select it as the active developer directory, then generate the project:

```bash
sudo xcode-select -s /Applications/Xcode.app
bun run --filter extension package:safari
```

The generated project is written to `.output/safari-xcode`. Open it in Xcode,
choose an Apple Development team, and run the macOS app. Then enable Crikket in
Safari under **Settings → Extensions**. App Store distribution requires an
Apple Developer Program membership and Apple review.
