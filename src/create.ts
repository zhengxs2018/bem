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

/**
 * 创建命名空间
 *
 * @param config - bem 配置
 *
 * @example <caption>自定义组件前缀</caption>
 *
 * ```ts
 * const bem = createBEM({
 *   namespace: {
 *     component: 'ux'
 *   }
 * })
 *
 * const [name, button] = bem('button')
 *
 * console.log(name)
 * // -> ux-button
 *
 * console.log(button.element('icon'))
 * // -> "ux-button__icon"
 *
 * console.log(button.elem('icon')) // alias for element
 * // -> "ux-button__icon"
 *
 * console.log(button.modifier('primary'))
 * // -> "ux-button--primary"
 *
 * console.log(button.mod('primary')) // alias for modifier
 * // -> "ux-button--primary"
 *
 * console.log(button.state('is', 'loading'))
 * // -> "is-loading"
 *
 * console.log(button.is('loading'))
 * // -> "is-loading"
 *
 * console.log(button.has('error'))
 * // -> "has-error"
 * ```
 *
 * @example <caption>自定义分隔符</caption>
 *
 * ```ts
 * const bem = createBEM({
 *   namespace: {
 *     component: 'ux'
 *   },
 *   separator: {
 *     element: '-',
 *     modifier: '-',
 *     state: '--'
 *   }
 * })
 *
 * const [name, button] = bem('button')
 *
 * console.log(button.elem('icon'))
 * // -> "ux-button-icon"
 *
 * console.log(button.mod('primary'))
 * // -> "ux-button-primary"
 *
 * console.log(button.state('is', 'loading'))
 * // -> "is--loading"
 *
 * console.log(button.is('loading'))
 * // -> "is--loading"
 *
 * console.log(button.has('error'))
 * // -> "has--error"
 * ```
 */
export function createBEM(options: Options = {}): (name: string) => readonly [string, BEM] {
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

  return (name: string): readonly [string, BEM] => {
    const ns = getOpts('namespace', namespace)
    const sep = getOpts('separator', separator)

    const prefixName = [ns['component'], name].join('-')

    if (prefixName in cache) {
      return [prefixName, cache[prefixName] as BEM]
    }

    function element(value: string | number): string
    function element(...args: Argument[]): string[]
    function element(...args: Argument[]): string | string[] {
      return explode(prefixName, args, sep['element'])
    }

    function modifier(value: string | number): string
    function modifier(...args: Argument[]): string[]
    function modifier(...args: Argument[]): string | string[] {
      return explode(prefixName, args, sep['modifier'])
    }

    function state(prefix: string, value: string | number): string
    function state(prefix: string, ...args: Argument[]): string[]
    function state(prefix: string, ...args: Argument[]): string | string[] {
      return explode(prefix, args, sep['state'])
    }

    function is(value: string | number): string
    function is(...args: Argument[]): string[]
    function is(...args: Argument[]): string | string[] {
      return explode('is', args, sep['state'])
    }

    function has(value: string | number): string
    function has(...args: Argument[]): string[]
    function has(...args: Argument[]): string | string[] {
      return explode('has', args, sep['state'])
    }

    const bem: BEM = {
      element,
      elem: element,
      modifier: modifier,
      mod: modifier,
      state,
      is,
      has,
    }

    return [prefixName, (cache[prefixName] = bem)]
  }
}
