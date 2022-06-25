# VVS

## TODO

* Move merge breach and crew features into crew/breach/\*
* Investigate whether driver feature makes sense merging with crew
* Merge Key feature with Object feature
* Why lockfile version changed 2 -> 1?
* Should we redo Listing Layout?

## Package manager

**USE ONLY NPM, NOT YARN!**

This is due to the bug that yarn cannot
authorize to private GitLab NPM registry
with instance-level configuration.

[Guide to authorize into the private NPM registry](https://gitlab.com/s-e/reusable/frontend).

## Requirements
* Node.js https://nodejs.org/en/download

## Scripts
`npm i` - install packages, and then `npm run prepare` - _husky_ installation

`npm run start` - compiles and hot-reloads for development

`npm run build` - compiles and minifies for production

`npm run lint` - fix eslint errors
