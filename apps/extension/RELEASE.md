# Browser extension releases

Extension releases use their own `extension-v*` tag namespace so they do not
trigger the repository's existing Docker release workflow.

## Create a release

Make sure `master` contains the version you want to ship, then create and push
an annotated tag:

```bash
git switch master
git pull --ff-only origin1 master
git tag -a extension-v0.2.0 -m "Crikket Community Extension v0.2.0"
git push origin1 extension-v0.2.0
```

The `Release browser extensions` workflow creates a GitHub Release containing:

- `crikket-community-<version>-chrome.zip`
- `crikket-community-<version>-firefox.zip`
- `crikket-community-<version>-firefox-sources.zip`
- `crikket-community-<version>-safari-webextension.zip`
- `crikket-community-<version>-safari-unsigned-app.zip`
- `crikket-community-<version>-safari-xcode-project.zip`
- `SHA256SUMS.txt`
- `SAFARI-SHA256SUMS.txt`

The workflow derives the manifest version from the tag and requires a stable
three-part numeric version. Do not include another leading `v` after the
`extension-v` prefix.

The following optional GitHub repository variables customize the fork flavor:

- `EXTENSION_FLAVOR` — artifact filename prefix
- `EXTENSION_NAME` and `EXTENSION_SHORT_NAME` — browser-visible names
- `FIREFOX_EXTENSION_ID` — stable AMO add-on ID
- `SAFARI_APP_NAME` and `SAFARI_BUNDLE_IDENTIFIER` — native wrapper identity
- `EXTENSION_APP_URL` and `EXTENSION_SERVER_URL` — production endpoints

## Installation notes

- **Chrome:** load the unpacked build for development or upload the Chrome ZIP
  to the Chrome Web Store for normal distribution.
- **Firefox:** Release and Beta require Mozilla signing. Upload the Firefox ZIP
  and full-monorepo source ZIP to AMO, or use the signing command documented in
  `README.md`. The default community flavor uses add-on ID
  `crikket-community@yan-ad.github.io`.
- **Safari:** the workflow also builds an unsigned macOS `.app` and uploads the
  generated Xcode project. The unsigned app is only for local testing after
  enabling Safari's **Develop → Allow Unsigned Extensions** option. Normal
  distribution still requires Apple certificates, notarization/App Store
  Connect, and an Apple Developer Program membership.

The packaging script normalizes the generated app bundle ID to
`SAFARI_BUNDLE_IDENTIFIER` and the embedded extension ID to
`SAFARI_BUNDLE_IDENTIFIER.Extension`, as required by Xcode's embedded binary
validation.

## Manual release

The workflow can also be started from **Actions → Release browser extensions →
Run workflow**. Enter a semantic version without the `extension-v` prefix.
