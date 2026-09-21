import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: ({ browser }) => {
    const supportsTabCapture = browser !== "firefox" && browser !== "safari"
    const extensionName = process.env.EXTENSION_NAME ?? "Crikket"
    const extensionShortName = process.env.EXTENSION_SHORT_NAME ?? "Crikket"
    const firefoxExtensionId =
      process.env.FIREFOX_EXTENSION_ID ?? "extension@crikket.io"

    return {
      name: extensionName,
      description:
        "Capture screenshots, recordings, and debugging context for bug reports.",
      short_name: extensionShortName,
      action: {
        default_title: extensionName,
        default_popup: "popup.html",
      },
      ...(browser === "safari"
        ? {}
        : {
            commands: {
              "start-video-recording": {
                description: "Start video recording",
                suggested_key: {
                  default: "Alt+Shift+R",
                  mac: "Alt+Shift+R",
                },
              },
              "start-screenshot-capture": {
                description: "Start screenshot capture",
                suggested_key: {
                  default: "Alt+Shift+C",
                  mac: "Alt+Shift+C",
                },
              },
              "stop-video-recording": {
                description: "Stop video recording",
                suggested_key: {
                  default: "Alt+Shift+S",
                  mac: "Alt+Shift+S",
                },
              },
            },
          }),
      permissions: [
        "activeTab",
        "scripting",
        "storage",
        "tabs",
        ...(supportsTabCapture ? ["tabCapture"] : []),
      ],
      host_permissions: ["<all_urls>"],
      ...(browser === "firefox"
        ? {
            browser_specific_settings: {
              gecko: {
                id: firefoxExtensionId,
                strict_min_version: "142.0",
                data_collection_permissions: {
                  required: [
                    "browsingActivity",
                    "websiteActivity",
                    "websiteContent",
                  ],
                },
              },
            },
          }
        : {}),
    }
  },
})
