export type Value = string | number | false | undefined | null

export type Argument = Value | Record<string, unknown> | Argument[]

export interface Namespace {
  component: string
}
export interface Separator {
  element: string
  modifier: string
  state: string
}
