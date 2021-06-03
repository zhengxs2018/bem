/// <reference types="@types/jest" />

jest.mock('../src/config')

beforeEach(() => {
  jest.resetModules()
})

test('has(String)', function () {
  // eslint-disable-next-line
  const { has } = require('../src/bem')

  expect(has('loading')).toStrictEqual(['has-loading'])
})

test('has(Number)', function () {
  // eslint-disable-next-line
  const { has } = require('../src/bem')

  expect(has(0)).toStrictEqual(['has-0'])
})

test('has(Falsy)', function () {
  // eslint-disable-next-line
  const { has } = require('../src/bem')

  expect(has(false)).toStrictEqual([])
  expect(has(null)).toStrictEqual([])
  expect(has(undefined)).toStrictEqual([])
})

test('has(Object)', function () {
  // eslint-disable-next-line
  const { has } = require('../src/bem')

  const result = has({ loading: true, disabled: false })
  const expected = ['has-loading']

  expect(result).toStrictEqual(expected)
})

test('has(Primitives)', function () {
  // eslint-disable-next-line
  const { has } = require('../src/bem')

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

test('has(globalConfig)', function () {
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
  const { has } = require('../src/bem')

  expect(has('readonly')).toStrictEqual(['has-readonly'])

  config.separator.state = '__'

  expect(has('readonly')).toStrictEqual(['has__readonly'])
})
