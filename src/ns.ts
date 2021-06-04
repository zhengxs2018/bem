import { component } from './bem'
import { separator } from './config'
import { explode } from './implode-explode'

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

const cache: Record<string, BEM> = {}

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
 * @example <caption>自定义分隔符</caption>
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
export function createNamespace(name: string, options: NamespaceOptions = {}): readonly [string, BEM] {
  const ns = options['namespace'] || {}
  const sep = options['separator'] || {}

  const prefixName = component(name, ns['component'])

  // 服用同一个配置
  if (prefixName in cache) {
    return [prefixName, cache[prefixName] as BEM]
  }

  function element(value: string | number): string
  function element(...args: Argument[]): string[]
  function element(...args: Argument[]): string | string[] {
    return explode(prefixName, args, sep['element'] || separator['element'])
  }

  function modifier(value: string | number): string
  function modifier(...args: Argument[]): string[]
  function modifier(...args: Argument[]): string | string[] {
    return explode(prefixName, args, sep['modifier'] || separator['modifier'])
  }

  const bem: BEM = { element, elem: element, modifier: modifier, mod: modifier }

  return [prefixName, bem]
}
