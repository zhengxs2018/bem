import { namespace, separator } from './config'

export { component, element, modifier, state, is, has } from './bem'

export type { Separator, Namespace, Argument } from './types'

export default {
  namespace,
  separator,
  version: '__VERSION__',
}
