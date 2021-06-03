import type { Namespace, Separator } from './types'

/**
 * 命名空间
 *
 * @example <caption>修改命名空间</caption>
 *
 * ```ts
 * import BEM, { component } from '@zhengxs/bem'
 *
 * // 默认以 c 开头
 * component('button')
 * // c-button
 *
 * // 修改默认配置
 * BEM.namespace.component = 'md'
 *
 * // 只有在修改配置后面的才生效
 * component('button')
 * // md-button
 *
 * // 不会影响自定义的命名空间
 * component('button', 'ux')
 * // ux-button
 * ```
 */
export const namespace: Namespace = {
  component: 'c',
}

/**
 * 修饰符
 *
 * @example <caption>修改 element 的修饰符</caption>
 *
 * ```ts
 * import BEM, { element } from '@zhengxs/bem'
 *
 * element('button', 'icon')
 * // button__icon
 *
 * // 修改全局命名空间
 * BEM.separator.element = '-'
 *
 * // 读取全局配置
 * element('button', 'icon')
 * // button-icon
 * ```
 *
 * @example <caption>修改 modifier 的修饰符</caption>
 *
 * ```ts
 * import BEM, { modifier } from '@zhengxs/bem'
 *
 * modifier('button', 'large')
 * // button--large
 *
 * // 修改全局命名空间
 * BEM.separator.modifier = '-'
 *
 * // 读取全局配置
 * modifier('button', 'large')
 * // button-large
 * ```
 *
 * @example <caption>修改 state 的修饰符</caption>
 *
 * ```ts
 * import BEM, { state, is, has } from '@zhengxs/bem'
 *
 * state('is', 'loading')
 * // is-loading
 *
 * // 修改全局命名空间
 * BEM.separator.state = '--'
 *
 * state('is', 'loading')
 * // is--loading
 *
 * is('loading')
 * // is--loading
 *
 * has('error')
 * // has--error
 * ```
 */
export const separator: Separator = {
  element: '__',
  modifier: '--',
  state: '-',
}
