# Firefox source-code review

The Firefox source archive is generated from the complete monorepo because the
extension depends on local `workspace:*` packages.

## Requirements

- Bun 1.3.5
- Node.js 22

## Rebuild the Firefox package

From the extracted source archive:

```bash
export EXTENSION_NAME="Crikket Community"
export EXTENSION_SHORT_NAME="Crikket CE"
export FIREFOX_EXTENSION_ID="crikket-community@yan-ad.github.io"
export VITE_APP_URL="https://app.crikket.io"
export VITE_SERVER_URL="https://api.crikket.io"

bun install --frozen-lockfile
bun run --filter extension zip:firefox
```

The Firefox extension ZIP and the WXT-generated source ZIP are written to
`apps/extension/.output/`. The GitHub release uses a full-repository source ZIP
so every workspace dependency required for a reproducible build is present.
