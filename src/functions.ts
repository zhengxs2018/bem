import { separator as SeparatorEnum } from './config'

import type { Argument, Separator } from './types'

/**
 * 拆解选择器列表
 *
 * @param prefix    - 前缀
 * @param list      - 选择器列表
 * @param separator - 分隔符
 *
 * @example <caption>基础</caption>
 *
 * ```ts
 * // 内置分隔符
 *
 * explode('button', ['icon', 'text'], 'element') // element
 * // -> ["button__icon", "button__text"]
 *
 * explode('button', ['default', 'success'], 'modifier') // modifier
 * // -> ["button--default", "button--success"]
 *
 * explode('is', ['loading', 'disabled'], 'state') // state
 * // -> ["is-loading","is-disabled"]
 *
 * // 支持类型
 *
 * explode('button', ['icon', 'text'], 'element') // 数组
 * // -> ["button__icon", "button__text"]
 *
 * explode('button', [{ icon: true, text: false }], 'element') // 对象
 * // -> ["button__icon"]
 *
 * explode('button', [{ icon: true, text: false }, 'demo', [['doc']]], 'element') // 嵌套数组
 * // -> ["button__icon", "button__demo", "button__doc"]
 * ```
 *
 * @example <caption>自定义分隔符</caption>
 *
 * ```ts
 * explode('button', ['icon', 'text'], '-')
 * // -> ["button-icon", "button-text"]
 * ```
 */
export function explode(
  prefix: string,
  list: Argument[],
  separator: keyof Separator | string
): string[] {
  // 允许自定义分隔符号
  if (separator in SeparatorEnum) {
    separator = SeparatorEnum[separator as keyof Separator]
  }

  function handle(result: string[], selector: Argument) {
    return result.concat(implode(prefix, selector, separator))
  }

  return list.reduce(handle, [] as string[])
}

/**
 * 递归拆解选择器
 *
 * @param prefix    - 区块
 * @param selector  - 选择器
 * @param separator - 分隔符
 *
 * @example <caption>基础</caption>
 *
 * ```ts
 * implode('button', 'icon', '__')
 * // -> "button__icon"
 *
 * implode('button', ['icon', 'text'], '__')
 * // -> ["button__icon", "button__text"]
 *
 * implode('button', { icon: true, text: false }, '__')
 * // -> ["button__icon"]
 * ```
 *
 * @example <caption>复杂</caption>
 *
 * ```ts
 * implode('button', [{ icon: true, text: false }, 'demo', [['doc']]], '__')
 * // -> ["button__icon", "button__demo", "button__doc"]
 * ```
 */
export function implode(
  prefix: string,
  selector: Argument,
  separator: string
): string | string[] {
  if (selector === null || selector === undefined || selector === false) {
    return []
  }

  if (Array.isArray(selector)) {
    const concat = (result: string[], str: Argument) => {
      return result.concat(implode(prefix, str, separator))
    }
    return selector.reduce(concat, [] as string[])
  }

  if (typeof selector === 'object') {
    const result: string[] = []

    for (const key in selector) {
      if (selector[key]) {
        result.push([prefix, key].join(separator))
      }
    }
    return result
  }

  return [prefix, selector].join(separator)
}
