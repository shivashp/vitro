import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import path from 'path'
import { glob, GlobOptions } from './glob'

export async function generateModulesMap({ cwd = '.', globs, ignore }) {
    const options: GlobOptions = {
        ignore,
        cwd,
        filesOnly: true,
    }
    const results: string[][] = await Promise.all(
        globs.map((s) => glob(s, options)),
    )
    const files: string[] = uniq(flatten(results))
    return printModulesMap({ files, base: cwd })
}

function printModulesMap(p: { files: string[]; base: string }) {
    let result = 'module.exports = {\n'
    p.files.forEach((f) => {
        const importPath = path.join(p.base || '.', f)
        result += '    '
        result += `'${f}': () => require('${importPath}'),`
        result += '\n'
    })
    result += '}'
    return result
}