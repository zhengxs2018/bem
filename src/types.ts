export type Value = string | number

export type Falsy = false | undefined | null

export type Mapping = Record<string, unknown>

export type Argument = Value | Falsy | Mapping | Argument[]

export interface Namespace {
  component: string
}
export interface Separator {
  element: string
  modifier: string
  state: string
}
