/// <reference types="@types/jest" />

import { modifier } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

test('modifier(String)', function () {
  expect(modifier('button', 'default')).toStrictEqual('button--default')
})

test('modifier(Number)', function () {
  expect(modifier('col', 0)).toStrictEqual('col--0')
})

test('modifier(Falsy)', function () {
  expect(modifier('button', false)).toStrictEqual([])
  expect(modifier('button', null)).toStrictEqual([])
  expect(modifier('button', undefined)).toStrictEqual([])
})

test('modifier(Object)', function () {
  const result = modifier('button', { foo: true, danger: false })
  const expected = ['button--foo']

  expect(result).toStrictEqual(expected)
})

test('modifier(Primitives)', function () {
  const result = modifier(
    'button',
    { foo: true, danger: false },
    [['doc'], { bar: true, test: false }],
    'default',
    1,
    undefined,
    null,
    false
  )
  const expected = ['button--foo', 'button--doc', 'button--bar', 'button--default', 'button--1']

  expect(result).toStrictEqual(expected)
})

test('modifier(globalConfig)', function () {
  jest.doMock('../src/config', () => {
    return { separator: { modifier: '--' } }
  })

  // eslint-disable-next-line
  const { separator, modifier } = require('../src/index')

  expect(modifier('button', 'default')).toStrictEqual('button--default')

  separator.modifier = '-'

  expect(modifier('button', 'default')).toStrictEqual('button-default')
})
