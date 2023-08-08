import React from "react"

async function installMockService() {
  if (import.meta.env.DEV) {
    await import("../mock/browser").then(({ createWorker }) => createWorker()).then((worker) => worker.start())
  }
}

async function installWdyr() {
  if (import.meta.env.VITE_WDYR_ENABLED === "ture") {
    const { default: wdyr } = await import("@welldone-software/why-did-you-render")
    wdyr(React, {
      exclude: [/^BrowserRouter/, /^Link/, /^Route/],
      trackHooks: true,
      trackAllPureComponents: true,
    })
  }
}

export async function setup() {
  if (import.meta.env.VITE_WDYR_ENABLED === "true") await installWdyr()
  if (import.meta.env.VITE_MOCK_ENABLED === "true") await installMockService()
}
