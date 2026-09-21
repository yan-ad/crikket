import { readFile, writeFile } from "node:fs/promises"

const [projectFile, bundleIdentifier] = process.argv.slice(2)

if (!(projectFile && bundleIdentifier)) {
  throw new Error(
    "Usage: bun normalize-safari-project.ts <project.pbxproj> <bundle-identifier>"
  )
}

const project = await readFile(projectFile, "utf8")
let appIdentifiers = 0
let extensionIdentifiers = 0

const normalizedProject = project.replace(
  /(PRODUCT_BUNDLE_IDENTIFIER = )("?)([^";\n]+)\2;/g,
  (_match, prefix: string, quote: string, currentIdentifier: string) => {
    const isExtension = currentIdentifier.toLowerCase().endsWith(".extension")
    const normalizedIdentifier = isExtension
      ? `${bundleIdentifier}.Extension`
      : bundleIdentifier

    if (isExtension) {
      extensionIdentifiers += 1
    } else {
      appIdentifiers += 1
    }

    return `${prefix}${quote}${normalizedIdentifier}${quote};`
  }
)

if (appIdentifiers === 0 || extensionIdentifiers === 0) {
  throw new Error(
    `Could not identify both Safari app and extension bundle identifiers in ${projectFile}`
  )
}

await writeFile(projectFile, normalizedProject)
console.log(
  `Normalized Safari bundle identifiers to ${bundleIdentifier} and ${bundleIdentifier}.Extension`
)
