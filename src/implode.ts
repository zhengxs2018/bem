import type { Argument, Value } from './types'

/**
 * 递归拆解选择器
 *
 * @param namespace - 命名空间
 * @param selector  - 选择器
 * @param separator - 分割符
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
export function implode(namespace: string, selector: string | number, separator: string): string
export function implode(
  namespace: string,
  selector: Argument | Argument[],
  separator: string
): string[]
export function implode(
  namespace: string,
  selector: Value | Argument | Argument[],
  separator: string
): string | string[] {
  if (selector === null || selector === undefined || selector === false) {
    return []
  }

  if (Array.isArray(selector)) {
    const concat = (result: string[], str: Argument) => {
      return result.concat(implode(namespace, str, separator))
    }
    return selector.reduce(concat, [] as string[])
  }

  if (typeof selector === 'object') {
    const result: string[] = []

    for (const key in selector as Record<string, unknown>) {
      if (selector[key]) {
        result.push([namespace, key].join(separator))
      }
    }
    return result
  }

  return [namespace, selector].join(separator)
}
