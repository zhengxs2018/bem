import { separator, namespace } from './config'
import { explode } from './implode-explode'

import type { Argument, Namespace, Separator } from './types'

export interface Options {
  namespace?: Partial<Namespace>
  separator?: Partial<Separator>
}

export interface Config {
  namespace: Namespace
  separator: Separator
}

export interface BEM {
  component(): string

  element(value: string | number): string
  element(arg: Argument, ...other: Argument[]): string[]
  elem(value: string | number): string
  elem(arg: Argument, ...other: Argument[]): string[]

  modifier(value: string | number): string
  modifier(arg: Argument, ...other: Argument[]): string[]
  mod(arg: Argument, ...other: Argument[]): string[]
  mod(arg: Argument, ...other: Argument[]): string[]

  state(prefix: string, value: string | number): string
  state(prefix: string, arg: Argument, ...other: Argument[]): string[]

  is(value: string | number): string
  is(arg: Argument, ...other: Argument[]): string[]

  has(value: string | number): string
  has(arg: Argument, ...other: Argument[]): string[]
}

export interface BEMStatic {
  (block: string): BEM

  component(name: string): string

  state(prefix: string, value: string | number): string
  state(prefix: string, arg: Argument, ...other: Argument[]): string[]

  is(value: string | number): string
  is(arg: Argument, ...other: Argument[]): string[]

  has(value: string | number): string
  has(arg: Argument, ...other: Argument[]): string[]
}

/**
 * 创建命名空间
 *
 * @param options - 可选配置
 *
 * @example <caption>默认</caption>
 *
 * ```js
 * const bem = createBEM()
 * const button = bem('button')
 *
 *  console.log(button.component())
 * // -> 'c-button'
 *
 *  console.log(button.element('icon'))
 * // -> 'c-button__icon'
 *
 *  console.log(button.elem('icon')) // alias for element
 * // -> 'c-button__icon'
 *
 *  console.log(button.modifier('default'))
 * // -> 'c-button--default'
 *
 *  console.log(button.mod('default')) // alias for modifier
 * // -> 'c-button--default'
 *
 *  console.log(button.state('is', 'default'))
 * // -> 'is-default'
 *
 *  console.log(button.is('loading'))
 * // -> 'is-loading'
 *
 *  console.log(button.has('error'))
 * // -> 'has-error'
 *
 * // 不管调用几次，拿到的都是同一个对象
 *  console.log(button === bem('icon'))
 * // -> true
 *
 * // 不同名称拿到的是不同的对象
 *  console.log(button === bem('icon'))
 *  // -> false
 *
 * // 不同的 create，即使是相同的名称拿到的也不一样的
 *  console.log(button === createBEM()('button'))
 * // -> false
 * ```
 *
 * @example <caption>自定义前缀</caption>
 *
 * ```js
 * const options = {
 *   namespace: { component: 'ux' }
 * }
 *
 * const bem = createBEM(options)
 *
 * const button = bem('button')
 *
 * console.log(button.component())
 * //-> 'ux-button'
 *
 * console.log(button.element('icon'))
 * //-> 'ux-button__icon'
 *
 * console.log(button.modifier('default'))
 * //-> 'ux-button--default'
 *
 * // 修改命名空间
 * options['namespace']['component'] = 'md'
 *
 * console.log(button.component())
 * //-> 'md-button'
 *
 * console.log(button.element('icon'))
 * //-> 'md-button__icon'
 *
 *  console.log(button.modifier('default'))
 * //-> 'md-button--default'
 *
 * // 再次修改命名空间
 * options['namespace']['component'] = 'c'
 *
 * console.log(button.component())
 * //-> 'c-button'
 *
 * console.log(button.element('icon'))
 * //-> 'c-button__icon'
 *
 * console.log(button.modifier('default'))
 * //-> 'c-button--default'
 *
 * // 直接重置对象
 * options['namespace'] = { 'component': 'ux' }
 *
 * console.log(button.component())
 * //-> 'ux-button'
 *
 * console.log(button.element('icon'))
 * //-> 'ux-button__icon'
 *
 * console.log(button.modifier('default'))
 * //-> 'ux-button--default'
 * ```
 *
 * @example <caption>自定义分隔符</caption>
 *
 * ```js
 * const options = {
 *   separator: {
 *     element: '-',
 *     modifier: '-',
 *     state: '#',
 *   }
 * }
 *
 * console.log(button.element('icon'))
 * //-> 'c-button-icon'
 *
 * console.log(button.modifier('default'))
 * //-> 'c-button-default'
 *
 * console.log(button.state('is', 'default'))
 * //-> 'is#default'
 *
 * console.log(button.is('loading'))
 * //-> 'is#loading'
 *
 * console.log(button.has('error'))
 * //-> 'has#error'
 *
 * // 修改单个修饰符
 * options['separator']['element'] = '__'
 *
 * console.log(button.element('icon'))
 * //-> 'c-button__icon'
 *
 * // 重置配置
 * options['separator'] = {
 *   element: '__',
 *   modifier: '--',
 *   state: '-',
 * }
 *
 * console.log(button.element('icon'))
 * //-> 'c-button__icon'
 *
 * console.log(button.modifier('default'))
 * //-> 'c-button--default'
 *
 * console.log(button.state('is', 'loading'))
 * //-> 'is-loading'
 *
 * console.log(button.is('loading'))
 * //-> 'is-loading'
 *
 * console.log(button.has('error'))
 * //-> 'has-error'
 * ```
 */
export function createBEM(options: Options = {}): BEMStatic {
  const cache: Record<string, BEM> = {}

  // 延迟合并配置
  const lazy: Partial<Record<keyof Options, boolean>> = {}

  function getOpts<T extends keyof Options>(key: T, defaultValue: Config[T]): Config[T] {
    if (key in lazy) {
      return options[key] as Config[T]
    }

    if (key in options) {
      lazy[key] = true
      options[key] = Object.assign({}, defaultValue, options[key])
      return options[key] as Config[T]
    }

    return defaultValue
  }

  function component(name: string) {
    const ns = getOpts('namespace', namespace)

    return [ns['component'], name].join('-')
  }

  function state(prefix: string, value: string | number): string
  function state(prefix: string, ...args: Argument[]): string[]
  function state(prefix: string, ...args: Argument[]): string | string[] {
    const sep = getOpts('separator', separator)
    return explode(prefix, args, sep['state'])
  }

  function is(value: string | number): string
  function is(...args: Argument[]): string[]
  function is(...args: Argument[]): string | string[] {
    const sep = getOpts('separator', separator)
    return explode('is', args, sep['state'])
  }

  function has(value: string | number): string
  function has(...args: Argument[]): string[]
  function has(...args: Argument[]): string | string[] {
    const sep = getOpts('separator', separator)

    return explode('has', args, sep['state'])
  }

  function create(name: string): BEM {
    if (name in cache) return cache[name] as BEM

    function element(value: string | number): string
    function element(...args: Argument[]): string[]
    function element(...args: Argument[]): string | string[] {
      const sep = getOpts('separator', separator)

      return explode(component(name), args, sep['element'])
    }

    function modifier(value: string | number): string
    function modifier(...args: Argument[]): string[]
    function modifier(...args: Argument[]): string | string[] {
      const sep = getOpts('separator', separator)
      return explode(component(name), args, sep['modifier'])
    }

    const bem: BEM = (cache[name] = {
      component: () => component(name),
      element,
      elem: element,
      modifier,
      mod: modifier,
      state,
      is,
      has,
    })

    return bem
  }

  create.component = component
  create.state = state
  create.is = is
  create.has = has

  return create
}
