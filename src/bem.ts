import { separator, namespace } from './config'
import { explode } from './implode-explode'

import type { Argument } from './types'

/**
 * 组件
 *
 * @public
 *
 * @param name    - 名称
 * @param prefix  - 前缀
 *
 * @returns CSS类名
 *
 * @example
 *
 * ```ts
 * component('button')
 * // -> "c-button"
 *
 * component('button', 'md')
 * // -> "md-button"
 * ```
 */
export function component(name: string, prefix?: string): string {
  return [prefix || namespace['component'], name].join('-')
}

/**
 * 节点
 *
 * @public
 *
 * @param block - 块名称
 * @param args  - 参数列表
 *
 * @returns CSS类名列表
 *
 * @example <caption>单参</caption>
 *
 * ```ts
 * element('button', 'icon')
 * // -> "button__icon"
 *
 * element('button', ['icon', 'text'])
 * // -> ["button__icon", "button__text"]
 *
 * element('button',{ icon: true, text: false })
 * // -> ["button__icon"]
 * ```
 *
 * @example <caption>多参数</caption>
 *
 * ```ts
 * element('button', { icon: true, text: false }, 'demo', [['doc']], null, undefined, false)
 * // -> ["button__icon", "button__demo", "button__doc"]
 * ```
 */
export function element(prefix: string, value: string | number): string
export function element(prefix: string, ...args: Argument[]): string[]
export function element(prefix: string, ...args: Argument[]): string | string[] {
  return explode(prefix, args, separator['element'])
}

/**
 * 修饰符
 *
 * @public
 *
 * @param block - 块名称
 * @param args  - 参数列表
 *
 * @returns CSS类名列表
 *
 * @example <caption>单参</caption>
 *
 * ```ts
 * modifier('button', 'default')
 * // -> "button--default"
 *
 * modifier('button', ['default', 'primary'])
 * // -> ["button--default", "button--primary"]
 *
 * modifier('button',{ default: true, primary: false })
 * // -> ["button--default"]
 * ```
 *
 * @example <caption>多参数</caption>
 *
 * ```ts
 * modifier('button', { default: true, primary: false }, 'demo', [['doc']], null, undefined, false)
 * // -> ["button--default", "button--demo", "button--doc"]
 * ```
 */
export function modifier(prefix: string, value: string | number): string
export function modifier(prefix: string, ...args: Argument[]): string[]
export function modifier(prefix: string, ...args: Argument[]): string | string[] {
  return explode(prefix, args, separator['modifier'])
}

/**
 * 状态
 *
 * @public
 *
 * @param namespace - 命名空间
 * @param args      - 参数列表
 *
 * @returns CSS类名列表
 *
 * @example <caption>单参</caption>
 *
 * ```ts
 * state('is', 'loading')
 * // -> "is-loading"
 *
 * state('is', ['loading', 'disabled'])
 * // -> ["is-loading", "is-disabled"]
 *
 * state('is', { loading: true, disabled: false })
 * // -> ["is-loading"]
 * ```
 *
 * @example <caption>多参数</caption>
 *
 * ```ts
 * state('is', { loading: true, disabled: false }, 'demo', [['doc']], null, undefined, false)
 * // -> ["is-loading", "is-demo", "is-doc"]
 * ```
 */
export function state(prefix: string, value: string | number): string
export function state(prefix: string, ...args: Argument[]): string[]
export function state(prefix: string, ...args: Argument[]): string | string[] {
  return explode(prefix, args, separator['state'])
}

/**
 * 状态别名
 *
 * @public
 *
 * @param args - 参数列表
 *
 * @returns CSS类名列表
 *
 * @example <caption>单参</caption>
 *
 * ```ts
 * is('loading')
 * // -> "is-loading"
 *
 * is(['loading', 'disabled'])
 * // -> ["is-loading", "is-disabled"]
 *
 * is({ loading: true, disabled: false })
 * // -> ["is-loading"]
 * ```
 *
 * @example <caption>多参数</caption>
 *
 * ```ts
 * is({ loading: true, disabled: false }, 'demo', [['doc']], null, undefined, false)
 * // -> ["is-loading", "is-demo", "is-doc"]
 * ```
 */
export function is(value: string | number): string
export function is(...args: Argument[]): string[]
export function is(...args: Argument[]): string | string[] {
  return state('is', ...args)
}

/**
 * 状态别名
 *
 * @public
 *
 * @param args - 参数列表
 *
 * @returns CSS类名列表
 *
 * @example <caption>单参</caption>
 *
 * ```ts
 * has('success')
 * // -> "has-success"
 *
 * has(['success', 'error'])
 * // -> ["has-success", "has-error"]
 *
 * has({ success: true, error: false })
 * // -> ["has-success"]
 * ```
 *
 * @example <caption>多参数</caption>
 *
 * ```ts
 * has({ success: true, error: false }, 'demo', [['doc']], null, undefined, false)
 * // -> ["has-success", "has-demo", "has-doc"]
 * ```
 */
export function has(value: string | number): string
export function has(...args: Argument[]): string[]
export function has(...args: Argument[]): string | string[] {
  return state('has', ...args)
}
