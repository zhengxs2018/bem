<div align="center">
  <h1>
   <br/>
    <br/>
    👍
    <br />
    @zhengxs/bem
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/lang-typescript-informational?style=flat" alt="TypeScript" />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier" />
    </a>
    <a href="https://www.npmjs.com/package/@zhengxs/bem">
      <img src="https://img.shields.io/npm/v/@zhengxs/bem.svg" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@zhengxs/bem">
      <img src="https://img.shields.io/npm/dt/@zhengxs/bem.svg" alt="npm downloads" />
    </a>
    <a href="https://www.npmjs.com/package/@zhengxs/bem">
      <img src="https://img.shields.io/npm/dm/@zhengxs/bem.svg" alt="npm downloads" />
    </a>
    <a href="https://unpkg.com/@zhengxs/bem/dist/bem.min.js">
      <img src="https://img.badgesize.io/https:/unpkg.com/@zhengxs/bem/dist/bem.min.js?compression=gzip&style=flat" alt="Gzip Size" />
    </a>
    <a href="https://david-dm.org/zhengxs2018/bem?type=dev">
      <img src="https://david-dm.org/zhengxs2018/bem.svg" alt="Dependency Status" />
    </a>
    <a href="https://david-dm.org/zhengxs2018/bem?type=dev">
      <img src="https://david-dm.org/zhengxs2018/bem/dev-status.svg" alt="DevDependency Status" />
    </a>
    <a href="https://dashboard.cypress.io/projects/pj64uz/runs">
      <img src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/pj64uz/main&style=flat&logo=cypress" alt="Cypress" />
    </a>
    <a href="https://github.com/zhengxs2018/bem/actions/workflows/tests.yaml">
      <img src="https://github.com/zhengxs2018/bem/actions/workflows/tests.yaml/badge.svg" alt="Github action" />
    </a>
    <a href="https://circleci.com/gh/streamich/@zhengxs/bem">
      <img src="https://img.shields.io/npm/l/@zhengxs/bem.svg?style=flat-square" alt="License" />
    </a>
    <br />
    <br />
  </sup>
  <div>轻量级无依赖的 bem 工具，支持 nodejs 与浏览器。</div>
  <br />
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/@zhengxs/bem">@zhengxs/bem</a> --save</pre>
  <br />
  <br />
</div>

## 快速开始

### 文档

访问 [中文文档](https://zhengxs2018.github.io/bem/) 查看更详细的说明

### 安装

```shell
$ npm i @zhengxs/bem --save
```

### 使用

**工具函数**

```ts
import { component, element, modifier, state, is, has } from '@zhengxs/bem'

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

**全局配置**

```ts
import BEM, { component, element, modifier, state, is, has } from '@zhengxs/bem'

// 命名空间
BEM.namespace.component = 'md'

component('button')
// -> md-button

// 自定义的不受影响
component('button', 'ux')
// -> ux-button
```

**命名空间**

```js
import { createNamespace } from '@zhengxs/bem'

const [name, bem] = createNamespace('button', {
  namespace: {
    component: 'md'
  },
  // 可选
  // separator: {
  //   element: '-',
  //   modifier: '__',
  //   state: '-'
  // }
})

console.log(name)
// -> md-button

console.log(bem.element('text'))
// "md-button__text"

console.log(bem.modifier('primary'))
// "md-button--primary"
```

## 在线运行

```js
const bem = require('@zhengxs/bem')

const { component, element, modifier, state, is, has } = bem

// 修改全局命名空间
bem.namespace.component = 'md'

component('button')
// md-button

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

[Try in runkit](https://npm.runkit.com/@zhengxs/bem)

## 升级日志

[changelog](./CHANGELOG.md)

## 感谢

- [sass-bem](https://github.com/zgabievi/sass-bem) - 从中获得了一些灵感

## License

- MIT
