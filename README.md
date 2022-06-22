# VVS

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
