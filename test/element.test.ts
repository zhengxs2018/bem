/// <reference types="@types/jest" />

import { element } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

test('element(String)', function () {
  expect(element('button', 'icon')).toStrictEqual('button__icon')
})

test('element(Number)', function () {
  expect(element('col', 0)).toStrictEqual('col__0')
})

test('element(Falsy)', function () {
  expect(element('button', false)).toStrictEqual([])
  expect(element('button', null)).toStrictEqual([])
  expect(element('button', undefined)).toStrictEqual([])
})

test('element(Object)', function () {
  const result = element('button', { foo: true, text: false })
  const expected = ['button__foo']

  expect(result).toStrictEqual(expected)
})

test('element(Primitives)', function () {
  const result = element(
    'button',
    { foo: true, text: false },
    [['doc'], { bar: true, test: false }],
    'icon',
    1,
    undefined,
    null,
    false
  )
  const expected = ['button__foo', 'button__doc', 'button__bar', 'button__icon', 'button__1']

  expect(result).toStrictEqual(expected)
})

test('element(separator)', function () {
  jest.doMock('../src/config', () => {
    return { separator: { element: '__' } }
  })

  // eslint-disable-next-line
  const { separator, element } = require('../src/index')

  expect(element('button', 'icon')).toStrictEqual('button__icon')

  separator.element = '-'

  expect(element('button', 'icon')).toStrictEqual('button-icon')
})
