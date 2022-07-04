# VVS

## TODO

- [ ] Move merge breach and crew features into crew/breach/\*
- [ ] Investigate whether driver feature makes sense merging with crew
- [ ] Merge Key features with Object feature
- [ ] Why lockfile version changed 2 -> 1?
- [ ] Should we redo Listing Layout?

## Package manager

**USE ONLY NPM, NOT YARN!**

This is due to the bug that yarn cannot
authorize to private GitLab NPM registry
with instance-level configuration.

[Guide to authorize into the private NPM registry](https://gitlab.com/s-e/reusable/frontend) or check the [Requirements](https://gitlab.com/-/ide/project/s-e/eurocash/vvs/edit/staging/-/README.md#authenticate-to-the-package-registry).

## Requirements
* Node.js https://nodejs.org/en/download

### Authenticate to the Package Registry
This repository needs to install a package from the Synergy Effect private registry

<your_token>[^1]
```
npm config set -- '//gitlab.com/api/v4/projects/32043140/packages/npm/:_authToken' "<your_token>"
npm config set @s-e:registry https://gitlab.com/api/v4/packages/npm/
npm config set -- '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>"
```

## Scripts
`npm i` - install packages

`npm run start` - compiles and hot-reloads for development

`npm run build` - compiles and minifies for production

`npm run lint` - fix eslint errors

`npm run prepare` - _husky_ installation

## Footnotes

[^1]: Personal Access Token (Gitlab Account Preferences -> Access Token)
    * Token Name: @s-e/frontend_read_repository
    * Expiration date: till estimated project release
    * Select scopes: read_repository
