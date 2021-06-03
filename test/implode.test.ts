/// <reference types="@types/jest" />

import { implode } from '../src/functions'

test('test implode(selector=primitives)', function () {
  expect(implode('button', 'icon', '-')).toStrictEqual('button-icon')
  expect(implode('col', 1, '-')).toStrictEqual('col-1')
})

test('test implode(selector=object)', function () {
  const result = implode('button', { icon: true, text: false }, '-')
  const expected = ['button-icon']

  expect(result).toStrictEqual(expected)
})

test('test implode(selector=array)', function () {
  const result = implode('button', ['icon', [['text'], { foo: true, bar: false }]], '-')
  const expected = ['button-icon', 'button-text', 'button-foo']

  expect(result).toStrictEqual(expected)
})

test('test implode(separator)', function () {
  expect(implode('button', 'foo', '***')).toStrictEqual('button***foo')
})
