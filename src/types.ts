export interface Separator {
  element: string
  modifier: string
  state: string
}

export interface Namespace {
  component: string
  hack: string
  object: string
  scope: string
  test: string
  theme: string
  utility: string
}

export type Value = string | number | false | undefined | null

export type Argument = Value | Record<string, unknown> | Argument[]
