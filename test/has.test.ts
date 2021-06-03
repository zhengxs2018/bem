/// <reference types="@types/jest" />

import { has } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

test('has(String)', function () {
  expect(has('loading')).toStrictEqual('has-loading')
})

test('has(Number)', function () {
  expect(has(0)).toStrictEqual('has-0')
})

test('has(Falsy)', function () {
  expect(has(false)).toStrictEqual([])
  expect(has(null)).toStrictEqual([])
  expect(has(undefined)).toStrictEqual([])
})

test('has(Object)', function () {
  const result = has({ loading: true, disabled: false })
  const expected = ['has-loading']

  expect(result).toStrictEqual(expected)
})

test('has(Primitives)', function () {
  const result = has(
    { loading: true, disabled: false },
    [['doc'], { bar: true, test: false }],
    'readonly',
    1,
    undefined,
    null,
    false
  )
  const expected = ['has-loading', 'has-doc', 'has-bar', 'has-readonly', 'has-1']

  expect(result).toStrictEqual(expected)
})

test('has(separator)', function () {
  jest.doMock('../src/config', () => {
    return { separator: { state: '-' } }
  })

  // eslint-disable-next-line
  const { separator, has } = require('../src/index')

  expect(has('readonly')).toStrictEqual('has-readonly')

  separator.state = '__'

  expect(has('readonly')).toStrictEqual('has__readonly')
})
