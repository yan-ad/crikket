# @crikket-io/capture

## 0.2.0

### Minor Changes

- 5dbee24: Accept whatever display surface the reporter shares, instead of demanding a browser tab.

  `captureScreenshot()` and `startDisplayRecording()` asserted that the stream's `displaySurface` was exactly `"browser"` and otherwise stopped every track and threw "Please choose the current browser tab". That assert can never pass outside Chromium: Firefox has no `displaySurface` member in `MediaTrackSettings` at all and forces non-privileged `getDisplayMedia` to a window/screen list, and WebKit only ever reports `"monitor"` or `"window"` because macOS's picker offers no tab. Desktop Firefox and desktop Safari users were therefore told to pick a tab their browser does not offer, and the widget re-opened the picker every time they tried — capture was unusable on both. It also fired in Chrome whenever someone deliberately picked a window, which the Screen Capture spec explicitly permits ("the user agent MUST still offer the user unlimited choice of any display surface"). `preferCurrentTab` and the `displaySurface` constraint are kept as the hints the spec intends, and the chooser now says plainly what is about to be captured before the picker opens.

  `requestDisplayStream()` no longer catches a failed audio-enabled `getDisplayMedia` and silently calls it again without audio — cancelling the picker re-opened it immediately, so a cancel looked like a second prompt. Display audio capture is now feature-detected (`supportsDisplayAudioCapture()`), requested only where the engine implements it, and any rejection surfaces to the caller.

- be1dd72: Capture network/console activity from page load, not just from when the widget is opened.

  The network/console recorder previously installed only when a capture was started (button press), so requests made before that were never recorded and most screenshot reports said "No network requests were captured." The recorder now installs at `init()` by default and buffers events, and the buffered collector is handed to the eager runtime so nothing is lost across the lazy→eager handoff. A screenshot then replays the full retained window instead of only the short post-install lookback.

  Opt out with `collectDebuggerEagerly: false` to restore installing the recorder on first capture.

- f7a347e: Add launcher placement + lifecycle hooks, and keep the recording dock reachable.

  - **Launcher placement:** new `launcher` option (`{ position, offset }`, where `position` is `bottom-right` (default) / `bottom-left` / `top-right` / `top-left`) lets a host position the launcher without injecting CSS into the widget's shadow tree — CSS that was silently discarded when the runtime swapped its shadow host on first press.
  - **Lifecycle hooks:** new `onOpen`/`onClose` options and an `isOpen()` method, so a host can pause its own keyboard shortcuts while a report is being typed instead of reaching into private markup.
  - **Recording dock reachable:** the widget host is revealed again once recording is live, so the recording dock's Stop control is no longer hidden for the duration of the recording.

- 452514f: Support capturing bug reports on mobile browsers.

  Screen capture (`getDisplayMedia`) is a desktop-only web feature — iOS Safari does not define it and Android browsers define it but always reject it — so on mobile the launcher previously offered controls that threw at the moment of use. The widget now detects when display capture is not usable (an API check combined with a coarse mobile check that treats Android's defines-but-rejects behavior as unsupported) and offers an **Upload Screenshot** path instead, attaching an OS screenshot through the same review + submit pipeline. Console/network/URL/device context is still collected. Adds `attachScreenshotFile(file)` to drive this programmatically.

### Patch Changes

- da0aeb0: Fix uninstallable package: move bundled `@crikket/*` workspace packages from
  `dependencies` to `devDependencies`. They are inlined into the dist bundle at
  build time (`--packages=bundle`, only react/react-dom external), so declaring
  them as runtime deps leaked unresolved `workspace:*` specifiers into the
  published tarball and broke `npm/pnpm/yarn install` in external projects.

## 0.1.1

### Patch Changes

- Update dashboard ui style to mono & isolate capture sdk style
