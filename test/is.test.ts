/// <reference types="@types/jest" />

import { is } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

test('is(String)', function () {
  expect(is('loading')).toStrictEqual('is-loading')
})

test('is(Number)', function () {
  expect(is(0)).toStrictEqual('is-0')
})

test('is(Falsy)', function () {
  expect(is(false)).toStrictEqual([])
  expect(is(null)).toStrictEqual([])
  expect(is(undefined)).toStrictEqual([])
})

test('is(Object)', function () {
  const result = is({ loading: true, disabled: false })
  const expected = ['is-loading']

  expect(result).toStrictEqual(expected)
})

test('is(Primitives)', function () {
  const result = is(
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

test('is(separator)', function () {
  jest.doMock('../src/config', () => {
    return { separator: { state: '-' } }
  })

  // eslint-disable-next-line
  const { separator, is } = require('../src/index')

  expect(is('readonly')).toStrictEqual('is-readonly')

  separator.state = '__'

  expect(is('readonly')).toStrictEqual('is__readonly')
})
