import { version } from './version'
import { namespace, separator } from './config'

export { createBEM } from './create'
export type { Config, Options, BEM } from './create'

export { component, element, modifier, state, is, has } from './bem'

export type { Separator, Namespace, Argument, Value } from './types'

// 兼容 CommonJS
export { namespace, separator, version }

export default {
  namespace,
  separator,
  version,
}
