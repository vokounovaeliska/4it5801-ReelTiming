# [4IT580: Agilní vývoj webových aplikací](http://4it580.vse.cz/) na [VŠE](https://www.vse.cz/)

## [📖 4IT580: Docs](https://vse-4it580-docs-2024.vercel.app)

## JavaScript

We will be using [Node.js](https://nodejs.org/). Please see [`.nvmrc`](./.nvmrc) to find current node.js version we are using.
New JavaScript features (ES2015+) are "enabled" for all modern browsers with [Babel](https://babeljs.io/).

### Reference

- [JavaScript reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Learn ES2015](https://babeljs.io/docs/en/learn) + more:
  - [object rest spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/)
- [TypeScript docs](https://www.typescriptlang.org/docs/)

### Literature

- **[React docs](https://react.dev/learn)**
- books:
  - [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed)
    - [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/README.md)
    - [Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/README.md)
    - [ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/es6%20%26%20beyond/README.md)
  - [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)

### JavaScript Packages

- [yarn CLI docs](https://yarnpkg.com/en/docs/cli/)
- Useful commands:
  - `yarn install` (install local dependencies - based on `package.json` and `yarn.lock` files)
  - `yarn add <package-name>` (install new NPM package and add it as a dependency to `package.json`)
  - `yarn <script-name>` (eg. `yarn start`, `yarn format`, see `"scripts"` section in `package.json`)
- Search for packages:
  - [npmjs.com](https://www.npmjs.com/)

## Project Requirements

- [Node.js](https://nodejs.org/)
- [Yarn v1](https://classic.yarnpkg.com/)

## Local Installation

First download and install [Node.js](https://nodejs.org/en/download/) version described in [`./.nvmrc`](./.nvmrc) manually, or use a Node version manager like [nvm](https://github.com/nvm-sh/nvm), [nvm-windows](https://github.com/coreybutler/nvm-windows) or [fnm](https://github.com/Schniz/fnm).

```shell
corepack enable
yarn install
```

## Run Checks

To run Prettier, ESLint, and TypeScript checks run following command:

```shell
yarn check-all
```

## Server Setup

### SSH

- `ssh username@vse.handson.pro`
- frontend code: `cd ~/code/cviceni/frontend`

### Domains

- [dev-frontend-**username**-vse.handson.pro](http://dev-frontend-username-vse.handson.pro)
- [dev-backend-**username**-vse.handson.pro](http://dev-backend-username-vse.handson.pro)
