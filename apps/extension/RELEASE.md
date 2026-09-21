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
- `SHA256SUMS.txt`

The workflow derives the manifest version from the tag and requires a stable
three-part numeric version. Do not include another leading `v` after the
`extension-v` prefix.

The following optional GitHub repository variables customize the fork flavor:

- `EXTENSION_FLAVOR` — artifact filename prefix
- `EXTENSION_NAME` and `EXTENSION_SHORT_NAME` — browser-visible names
- `FIREFOX_EXTENSION_ID` — stable AMO add-on ID
- `EXTENSION_APP_URL` and `EXTENSION_SERVER_URL` — production endpoints

## Installation notes

- **Chrome:** load the unpacked build for development or upload the Chrome ZIP
  to the Chrome Web Store for normal distribution.
- **Firefox:** Release and Beta require Mozilla signing. Upload the Firefox ZIP
  and full-monorepo source ZIP to AMO, or use the signing command documented in
  `README.md`. The default community flavor uses add-on ID
  `crikket-community@yan-ad.github.io`.
- **Safari:** the ZIP contains Safari WebExtension assets, not a signed app.
  Convert it with Xcode, select an Apple Development team, then distribute the
  containing macOS/iOS app through Apple-supported channels.

## Manual release

The workflow can also be started from **Actions → Release browser extensions →
Run workflow**. Enter a semantic version without the `extension-v` prefix.
