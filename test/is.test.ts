/// <reference types="@types/jest" />

jest.mock('../src/config')

beforeEach(() => {
  jest.resetModules()
})

test('is(String)', function () {
  // eslint-disable-next-line
  const { is } = require('../src/bem')

  expect(is('loading')).toStrictEqual(['is-loading'])
})

test('is(Number)', function () {
  // eslint-disable-next-line
  const { is } = require('../src/bem')

  expect(is(0)).toStrictEqual(['is-0'])
})

test('is(Falsy)', function () {
  // eslint-disable-next-line
  const { is } = require('../src/bem')

  expect(is(false)).toStrictEqual([])
  expect(is(null)).toStrictEqual([])
  expect(is(undefined)).toStrictEqual([])
})

test('is(Object)', function () {
  // eslint-disable-next-line
  const { is } = require('../src/bem')

  const result = is({ loading: true, disabled: false })
  const expected = ['is-loading']

  expect(result).toStrictEqual(expected)
})

test('is(Primitives)', function () {
  // eslint-disable-next-line
  const { is } = require('../src/bem')

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

test('is(globalConfig)', function () {
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
  const { is } = require('../src/bem')

  expect(is('readonly')).toStrictEqual(['is-readonly'])

  config.separator.state = '__'

  expect(is('readonly')).toStrictEqual(['is__readonly'])
})
