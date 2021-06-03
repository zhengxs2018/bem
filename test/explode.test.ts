/// <reference types="@types/jest" />

import { explode } from '../src/functions'

test('test explode(list: String[])', function () {
  expect(explode('button', ['icon'], '-')).toStrictEqual(['button-icon'])
})

test('test explode(list: Number[])', function () {
  expect(explode('col', [0], '-')).toStrictEqual(['col-0'])
})

test('test explode(list: Falsy[])', function () {
  expect(explode('button', [false], '-')).toStrictEqual([])
  expect(explode('button', [null], '-')).toStrictEqual([])
  expect(explode('button', [undefined], '-')).toStrictEqual([])
})

test('test explode(list: Object[])', function () {
  expect(explode('button', [{ foo: true, text: false }], '-')).toStrictEqual(['button-foo'])
})

test('test explode(list: Primitives[])', function () {
  const result = explode(
    'button',
    [
      { foo: true, text: false },
      [['doc'], { bar: true, test: false }],
      'icon',
      '1',
      undefined,
      null,
      false,
    ],
    '-'
  )
  const expected = ['button-foo', 'button-doc', 'button-bar', 'button-icon', 'button-1']

  expect(result).toStrictEqual(expected)
})

test('test explode(separator=element)', function () {
  const result = explode('button', ['icon', 'text'], 'element')
  const expected = ['button__icon', 'button__text']

  expect(result).toStrictEqual(expected)
})

test('test explode(separator=modifier)', function () {
  const result = explode('button', ['default', 'success'], 'modifier')
  const expected = ['button--default', 'button--success']

  expect(result).toStrictEqual(expected)
})

test('test explode(separator=state)', function () {
  const result = explode('is', ['loading', 'disabled'], 'state')
  const expected = ['is-loading', 'is-disabled']

  expect(result).toStrictEqual(expected)
})

test('test explode(separator=custom)', function () {
  const result = explode('button', ['icon', 'text'], '-')
  const expected = ['button-icon', 'button-text']

  expect(result).toStrictEqual(expected)
})
