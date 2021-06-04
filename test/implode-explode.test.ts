/// <reference types="@types/jest" />

import { implode, explode } from '../src/implode-explode'

test('test explode(list=Array<string | number>)', function () {
  expect(explode('button', ['icon'], '-')).toStrictEqual('button-icon')
  expect(explode('col', [1], '-')).toStrictEqual('col-1')
})

test('test explode(list=object[])', function () {
  const result = explode('button', [{ icon: true, text: false }], '-')
  const expected = ['button-icon']

  expect(result).toStrictEqual(expected)
})

test('test explode(selector=complex)', function () {
  const result = explode('button', ['icon', [['text'], { foo: true, bar: false }]], '-')
  const expected = ['button-icon', 'button-text', 'button-foo']

  expect(result).toStrictEqual(expected)
})

test('test implode(selector=string | number)', function () {
  expect(implode('button', 'icon', '-')).toStrictEqual('button-icon')
  expect(implode('col', 1, '-')).toStrictEqual('col-1')
})

test('test implode(selector=object)', function () {
  const result = implode('button', { icon: true, text: false }, '-')
  const expected = ['button-icon']

  expect(result).toStrictEqual(expected)
})

test('test implode(selector=complex)', function () {
  const result = implode('button', ['icon', [['text'], { foo: true, bar: false }]], '-')
  const expected = ['button-icon', 'button-text', 'button-foo']

  expect(result).toStrictEqual(expected)
})

test('test implode(separator)', function () {
  expect(implode('button', 'foo', '***')).toStrictEqual('button***foo')
})
