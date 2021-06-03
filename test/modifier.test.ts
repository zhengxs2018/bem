/// <reference types="@types/jest" />

jest.mock('../src/config')

beforeEach(() => {
  jest.resetModules()
})

test('modifier(String)', function () {
  // eslint-disable-next-line
  const { modifier } = require('../src/bem')

  expect(modifier('button', 'default')).toStrictEqual(['button--default'])
})

test('modifier(Number)', function () {
  // eslint-disable-next-line
  const { modifier } = require('../src/bem')

  expect(modifier('col', 0)).toStrictEqual(['col--0'])
})

test('modifier(Falsy)', function () {
  // eslint-disable-next-line
  const { modifier } = require('../src/bem')

  expect(modifier('button', false)).toStrictEqual([])
  expect(modifier('button', null)).toStrictEqual([])
  expect(modifier('button', undefined)).toStrictEqual([])
})

test('modifier(Object)', function () {
  // eslint-disable-next-line
  const { modifier } = require('../src/bem')

  const result = modifier('button', { foo: true, danger: false })
  const expected = ['button--foo']

  expect(result).toStrictEqual(expected)
})

test('modifier(Primitives)', function () {
  // eslint-disable-next-line
  const { modifier } = require('../src/bem')

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
    return {
      separator: {
        element: '__',
        modifier: '--',
        state: '-',
      },
    }
  })

  // eslint-disable-next-line
  const config = require('../src/config')

  // eslint-disable-next-line
  const { modifier } = require('../src/bem')

  expect(modifier('button', 'default')).toStrictEqual(['button--default'])

  config.separator.modifier = '-'

  expect(modifier('button', 'default')).toStrictEqual(['button-default'])
})
