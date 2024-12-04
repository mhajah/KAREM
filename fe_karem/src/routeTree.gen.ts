/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CodeRunnerImport } from './routes/code-runner'

// Create Virtual Routes

const UsersLazyImport = createFileRoute('/users')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const UsersLazyRoute = UsersLazyImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/users.lazy').then((d) => d.Route))

const CodeRunnerRoute = CodeRunnerImport.update({
  id: '/code-runner',
  path: '/code-runner',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/code-runner': {
      id: '/code-runner'
      path: '/code-runner'
      fullPath: '/code-runner'
      preLoaderRoute: typeof CodeRunnerImport
      parentRoute: typeof rootRoute
    }
    '/users': {
      id: '/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/code-runner': typeof CodeRunnerRoute
  '/users': typeof UsersLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/code-runner': typeof CodeRunnerRoute
  '/users': typeof UsersLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/code-runner': typeof CodeRunnerRoute
  '/users': typeof UsersLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/code-runner' | '/users'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/code-runner' | '/users'
  id: '__root__' | '/' | '/code-runner' | '/users'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CodeRunnerRoute: typeof CodeRunnerRoute
  UsersLazyRoute: typeof UsersLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CodeRunnerRoute: CodeRunnerRoute,
  UsersLazyRoute: UsersLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/code-runner",
        "/users"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/code-runner": {
      "filePath": "code-runner.tsx"
    },
    "/users": {
      "filePath": "users.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */