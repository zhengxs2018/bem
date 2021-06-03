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
 * @param options - 配置项
 */
export function createNamespace(name: string, options: NamespaceOptions = {}): [string, BEM] {
  const ns = options['namespace'] || {}
  const sep = options['separator'] || {}

  const prefixName = component(name, ns['component'] || namespace['component'])

  function element(value: string | number): string
  function element(...args: Argument[]): string[]
  function element(...args: Argument[]): string | string[] {
    return implode(prefixName, args as Argument[], sep['element'] || separator['element'])
  }

  function modifier(value: string | number): string
  function modifier(...args: Argument[]): string[]
  function modifier(...args: Argument[]): string | string[] {
    return implode(prefixName, args as Argument[], sep['modifier'] || separator['modifier'])
  }

  return [prefixName, { element, elem: element, modifier: modifier, mod: modifier }]
}
