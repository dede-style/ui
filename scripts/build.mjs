/*  build — compiles the package source into dist/, the folder `@dede-style/ui`
    publishes. Paths are relative to the package root, so it runs the same in the
    dede repo and in the standalone package repo.

    THREE STEPS, and the reason for each.
    1. tsc, not a bundler. It keeps one output file per source module (so a site
       importing Button ships Button) and keeps each file's "use client" directive,
       which bundlers commonly strip — and without it every interactive component
       breaks inside a Next.js server component.
    2. Relative imports get explicit extensions. tsc emits `from "./Stack"`, and
       the package is `"type": "module"`, where Node and webpack resolve ESM
       FULLY SPECIFIED: an extensionless path is an error, not a guess. So each one
       is rewritten to the file or folder index it names, in .js and .d.ts alike.
    3. The stylesheets are copied as authored. global.css @imports its siblings
       by relative path, so the folder travels whole.

    Run: npm run build (in the package), or npm run build:package (in dede). */

import { execSync } from "node:child_process"
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const DIST = join(ROOT, "dist")

rmSync(DIST, { recursive: true, force: true })
execSync("npx tsc -p tsconfig.build.json", { cwd: ROOT, stdio: "inherit" })

const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
        const path = join(dir, name)
        return statSync(path).isDirectory() ? walk(path) : [path]
    })

const SPECIFIER = /(from\s+|import\s*\(\s*|import\s+)(["'])(\.{1,2}\/[^"']*)\2/g
let rewritten = 0
for (const file of walk(DIST).filter((f) => /\.(js|d\.ts)$/.test(f))) {
    const src = readFileSync(file, "utf8")
    const out = src.replace(SPECIFIER, (match, lead, quote, spec) => {
        if (/\.(js|css|json)$/.test(spec)) return match
        const target = resolve(dirname(file), spec)
        const fixed = existsSync(`${target}.js`)
            ? `${spec}.js`
            : existsSync(join(target, "index.js"))
              ? `${spec}/index.js`
              : null
        if (!fixed) throw new Error(`${file}: cannot resolve "${spec}"`)
        rewritten++
        return `${lead}${quote}${fixed}${quote}`
    })
    if (out !== src) writeFileSync(file, out)
}

cpSync(join(ROOT, "styles"), join(DIST, "styles"), { recursive: true })

const files = walk(DIST)
console.log(
    `build: ${files.filter((f) => f.endsWith(".js")).length} modules, ` +
        `${files.filter((f) => f.endsWith(".css")).length} stylesheets, ${rewritten} import paths made explicit`,
)
