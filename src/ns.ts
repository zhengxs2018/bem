import { separator, namespace } from './config'
import { implode } from './implode'
import { component } from './bem'

import type { Argument, Namespace, Separator } from './types'

export interface NamespaceOptions {
  namespace?: Partial<Namespace>
  separator?: Partial<Separator>
}

export interface BEM {
  element(value: string | number): string
  elem(value: string | number): string
  modifier(value: string | number): string
  mod(value: string | number): string
}

export interface BEM {
  element(...args: Argument[]): string[]
  elem(...args: Argument[]): string[]
  modifier(...args: Argument[]): string[]
  mod(...args: Argument[]): string[]
}

/**
 * 创建命名空间
 *
 * @param name    - 名称
 * @param options - 可选项
 *
 * @example <caption>基础</caption>
 *
 * ```ts
 * const [name, bem] = createNamespace('button')
 *
 * name
 * // -> c-button
 *
 * bem.element('icon')
 * // -> "c-button__icon"
 *
 * bem.element(['icon', 'text'])
 * // -> ["c-button__icon", "c-button__text"]
 *
 * bem.element({ icon: true, text: false })
 * // -> ["c-button__icon"]
 *
 * bem.modifier('default')
 * // -> "c-button--default"
 *
 * bem.modifier(['default', 'primary'])
 * // -> ["c-button--default", "c-button--primary"]
 *
 * bem.modifier('button',{ default: true, primary: false })
 * // -> ["c-button--default"]
 * ```
 *
 * @example <caption>自定义命名空间</caption>
 *
 * ```ts
 * const [name, bem] = createNamespace('button', {
 *   namespace: { component: 'ux' }
 * })
 *
 * name
 * // -> ux-button
 *
 * bem.element('icon')
 * // -> "ux-button__icon"
 * ```
 *
 * @example <caption>自定义分割符</caption>
 *
 * ```ts
 * const [name, bem] = createNamespace('button', {
 *   separator: { element: '-' }
 * })
 *
 * bem.element('icon')
 * // -> "c-button-icon"
 * ```
 */
export function createNamespace(name: string, options: NamespaceOptions = {}): [string, BEM] {
  const ns = options['namespace'] || {}
  const sep = options['separator'] || {}

  const prefixName = component(name, ns['component'] || namespace['component'])

  function element(value: string | number): string
  function element(...args: Argument[]): string[]
  function element(...args: Argument[]): string | string[] {
    return implode(prefixName, args.length === 1 ? args[0] : args, sep['element'] || separator['element'])
  }

  function modifier(value: string | number): string
  function modifier(...args: Argument[]): string[]
  function modifier(...args: Argument[]): string | string[] {
    return implode(prefixName, args.length === 1 ? args[0] : args, sep['modifier'] || separator['modifier'])
  }

  return [prefixName, { element, elem: element, modifier: modifier, mod: modifier }]
}
