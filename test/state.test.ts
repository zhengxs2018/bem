/// <reference types="@types/jest" />

import { state } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

test('state(String)', function () {
  expect(state('is', 'loading')).toStrictEqual('is-loading')
})

test('state(Number)', function () {
  expect(state('is', 0)).toStrictEqual('is-0')
})

test('state(Falsy)', function () {
  expect(state('is', false)).toStrictEqual([])
  expect(state('is', null)).toStrictEqual([])
  expect(state('is', undefined)).toStrictEqual([])
})

test('state(Object)', function () {
  const result = state('is', { loading: true, disabled: false })
  const expected = ['is-loading']

  expect(result).toStrictEqual(expected)
})

test('state(Primitives)', function () {
  const result = state(
    'is',
    { loading: true, disabled: false },
    [['doc'], { bar: true, test: false }],
    'readonly',
    1,
    undefined,
    null,
    false
  )
  const expected = ['is-loading', 'is-doc', 'is-bar', 'is-readonly', 'is-1']

  expect(result).toStrictEqual(expected)
})

test('state(globalConfig)', function () {
  jest.doMock('../src/config', () => {
    return { separator: { state: '-' } }
  })

  // eslint-disable-next-line
  const { separator, state } = require('../src/index')

  expect(state('is', 'readonly')).toStrictEqual('is-readonly')

  separator.state = '__'

  expect(state('is', 'readonly')).toStrictEqual('is__readonly')
})
