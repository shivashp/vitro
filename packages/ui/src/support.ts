import startCase from 'lodash/startCase'
import { useEffect, useState } from 'react'

export const version = require('../package.json').version

export const TOP_TITLE_H = '60px'

type GetStoriesReturnType = {
    filename: string
    title: string
    absolutePath: string
    // getExports: () => Record<string, any>
}[]

export const getStories = (storiesMap): GetStoriesReturnType => {
    return Object.keys(storiesMap).map((filename) => {
        return {
            absolutePath: storiesMap[filename],
            filename,
            title: formatPathToTitle(filename),
        }
    })
}

export function formatPathToTitle(path: string) {
    const endPath = path
        .split('/')
        .map((x) => x.trim())
        .filter(Boolean)
        .reverse()[0]
    const withoutExt = endPath.split('.')[0]
    return startCase(withoutExt)
}

export function usePromise(p) {
    const [v, set] = useState(!isPromise(p) ? p : undefined)
    useEffect(() => {
        if (isPromise(p)) {
            p.then(set)
        } else {
            set(p)
        }
    }, [])
    return [v]
}

function isPromise(p) {
    return p && typeof p.then === 'function'
}
