# @zhengxs/bem

[![lang](https://img.shields.io/badge/lang-typescript-informational?style=flat)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![npm version](https://img.shields.io/npm/v/%40zhengxs%2Fbem.svg?style=flat)](https://www.npmjs.com/package/%40zhengxs%2Fbem)
[![Downloads](https://img.shields.io/npm/dt/%40zhengxs%2Fbem.svg?style=flat)](https://www.npmjs.com/package/%40zhengxs%2Fbem)
[![Downloads](https://img.shields.io/npm/dm/%40zhengxs%2Fbem.svg?style=flat)](https://www.npmjs.com/package/%40zhengxs%2Fbem)
[![Gzip Size](http://img.badgesize.io/https://unpkg.com/@zhengxs/bem/dist/bem.min.js?compression=gzip&style=flat)](https://unpkg.com/@zhengxs/bem/dist/bem.min.js)
[![Dependency Status](https://david-dm.org/zhengxs2018/bem.SVG)](https://david-dm.org/zhengxs2018/bem?type=dev)
[![devDependency Status](https://david-dm.org/zhengxs2018/bem/dev-status.svg)](https://david-dm.org/zhengxs2018/bem?type=dev)
[![bem](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/pj64uz/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/pj64uz/runs)
[![Node.js CI](https://github.com/zhengxs2018/bem/actions/workflows/tests.yaml/badge.svg)](https://github.com/zhengxs2018/bem/actions/workflows/tests.yaml)
![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

---

## 快速开始

### 安装

```shell
$ npm i @zhengxs/bem --save
```

### 使用

bem

```ts
import BEM, { component, element, modifier, state, is, has } from '@zhengxs/bem'

component('button')
// c-button

element(
  'cell',
  'left-icon',
  ['title', 'label'],
  { 'right-icon': true, value: false },
  null,
  false,
  undefined
)
// -> ["cell__left-icon", "cell__title", "cell__label", "cell__right-icon"]

modifier('button', 'default')
// -> "button--default"

state('is', 'loading', ['disabled'], { readonly: true })
// -> ["is-loading", "is-disabled", "is-readonly"]

is('loading', 'disabled')
// -> ["is-loading", "is-disabled"]

has('error', { danger: true, warning: false })
// -> ["has-error", "has-danger"]
```

修改全局命名空间

```ts
import BEM, { component } from '@zhengxs/bem'

// 修改全局命名空间
BEM.namespace.component = 'md'

component('button')
// -> md-button

// 自定义的不受影响
component('button', 'ux')
// -> ux-button
```

## 在线运行

<a href="https://npm.runkit.com/@zhengxs/bem">
  <img src="https://static.runkitcdn.com/assets/images/brand/horizontal-logo-full.svg" height="44" alt="Try on RunKit">
</a>

## License

- MIT
