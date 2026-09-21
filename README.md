<h1 align="center">Crikket</h1>

<p align="center">
  <strong>Open-source bug reporting with the context engineers actually need.</strong>
</p>

<p align="center">
  Crikket helps teams capture bugs in one click, attach replay context automatically,
  and share reports with a single link.
</p>

<p align="center">
  <a href="https://github.com/yan-ad/crikket/releases">Releases</a> ·
  <a href="./apps/extension/RELEASE.md">Browser Extension</a> ·
  <a href="https://github.com/yan-ad/crikket/issues">Issues</a> ·
  <a href="./CONTRIBUTING.md">Contributing</a>
</p>

<p align="center">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/yan-ad/crikket?style=for-the-badge" />
  <img alt="GitHub License" src="https://img.shields.io/github/license/yan-ad/crikket?style=for-the-badge" />
  <img alt="Bun" src="https://img.shields.io/badge/Bun-1.4%2B-black?style=for-the-badge&logo=bun" />
</p>

![Crikket preview](./apps/docs/public/og.png)

## Project Status

This repository is the independently maintained home of Crikket. It has its
own releases, browser extension builds, and project direction. Maintenance and
release decisions happen in this repository.

Crikket was originally created by
[redpangilinan](https://github.com/redpangilinan). The original project and its
history are available at
[redpangilinan/crikket](https://github.com/redpangilinan/crikket). Their work
established the product and the codebase this project continues to develop.

## Why Crikket

Crikket is a modern, open-source alternative to tools like jam.dev and marker.io.
It is built for teams that want faster bug reproduction without giving up control
over their stack.

- Capture bugs with screenshot or screen recording directly in the browser
- Include reproduction steps, console logs, and network requests automatically
- Share reports instantly with public or private links
- Self-host the full stack under your own infrastructure
- Embed the capture widget in your own product with `@crikket-io/capture`

## What Makes It Useful

Every report is designed to reduce the usual debugging back-and-forth.

| Area | What Crikket includes |
| --- | --- |
| Capture | One-click screenshot and video bug reports |
| Reproduction | Recorded steps to help replay what happened |
| Technical context | Console logs and network requests attached to the report |
| Sharing | Public or private share links per report |
| Collaboration | Team workspaces, invites, and report management |
| Deployment | Quick and easy self-hosting |

## Quick Start

### Self-hosted

The fastest path from a fresh clone is the interactive setup wizard:

```bash
git clone https://github.com/yan-ad/crikket
cd crikket
./scripts/setup.sh
```

The wizard handles env files, secret generation, domain prompts, Caddy setup,
and Docker startup for the supported self-hosted flow.

Useful links:

- [Self-hosting quick start](./apps/docs/content/docs/self-hosting/quick-start.mdx)
- [Production deployment guide](./apps/docs/content/docs/self-hosting/production.mdx)
- [Self-hosting troubleshooting](./apps/docs/content/docs/self-hosting/troubleshooting.mdx)

### Local development

For contributor setup and app-specific environment details:

```bash
bun install
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/server/.env.example apps/server/.env
cp apps/docs/.env.example apps/docs/.env
cp apps/extension/.env.example apps/extension/.env
```

Then configure your env values, apply the database schema, and start the repo:

```bash
bun run db:push
bun run dev
```

Default local ports:

- `web`: `http://localhost:3001`
- `server`: `http://localhost:3000`
- `docs`: `http://localhost:4000`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

## Embed Crikket In Your Product

Crikket ships an embeddable capture SDK for websites and web apps:

```ts
import { init } from "@crikket-io/capture"

init({
  key: "crk_your_public_key",
  host: "https://your-crikket-server.example.com",
})
```

That mounts the capture launcher so users can submit screenshot or screen
recording bug reports without leaving your product.

- [Capture SDK README](./sdks/capture/README.md)
- [Capture quick start docs](./apps/docs/content/docs/usage/quick-start.mdx)

## Monorepo Overview

Crikket is a Bun + Turborepo monorepo.

| Path | Purpose |
| --- | --- |
| `apps/web` | Next.js app for the product dashboard |
| `apps/server` | Hono API for auth, capture, and backend workflows |
| `apps/docs` | Marketing site and docs |
| `apps/extension` | Browser extension app |
| `sdks/capture` | Embeddable browser capture SDK |
| `packages/*` | Shared internal packages |

## Contributing

Issues, pull requests, and feedback are welcome.

- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)

## License

Licensed under the [AGPL-3.0](./LICENSE).
