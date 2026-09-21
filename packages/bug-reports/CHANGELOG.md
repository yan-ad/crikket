# @crikket/bug-reports

## 0.0.1

### Patch Changes

- 0363210: Fix debugger ingestion failing with "incorrect header check" on S3 backends
  (Garage, MinIO) that transparently decompress `Content-Encoding: gzip` on read.
  Gate `gunzipSync` on the actual gzip magic bytes instead of the recorded
  encoding. Also stop 500ing the whole submission when the optional debugger
  payload fails — the report is already persisted, so return its
  `submissionStatus` instead.
- c8c7bf3: Fix bug report finalize failing with `403 SignatureDoesNotMatch` behind a CDN/proxy.

  The object existence check used at finalize signed a `HeadObject` request, but some CDNs/proxies (e.g. Cloudflare on a first-touch cache MISS) rewrite the first `HEAD` for a URL into a `GET`. That changes the SigV4 canonical request, so the object store rejects it with `403 SignatureDoesNotMatch` even though the object exists — and the check swallowed the error as "missing", surfacing to users as "Capture upload has not completed yet." for every report.

  The check now issues a single-byte ranged `GET` (signed as the method that is actually sent, so it survives the rewrite), treats a `416` as a present zero-byte object, and re-throws non-404 storage errors instead of masking a real failure as a missing object.
