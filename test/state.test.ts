/// <reference types="@types/jest" />

jest.mock('../src/config')

beforeEach(() => {
  jest.resetModules()
})

test('state(String)', function () {
  // eslint-disable-next-line
  const { state } = require('../src/bem')

  expect(state('is', 'loading')).toStrictEqual(['is-loading'])
})

test('state(Number)', function () {
  // eslint-disable-next-line
  const { state } = require('../src/bem')

  expect(state('is', 0)).toStrictEqual(['is-0'])
})

test('state(Falsy)', function () {
  // eslint-disable-next-line
  const { state } = require('../src/bem')

  expect(state('is', false)).toStrictEqual([])
  expect(state('is', null)).toStrictEqual([])
  expect(state('is', undefined)).toStrictEqual([])
})

test('state(Object)', function () {
  // eslint-disable-next-line
  const { state } = require('../src/bem')

  const result = state('is', { loading: true, disabled: false })
  const expected = ['is-loading']

  expect(result).toStrictEqual(expected)
})

test('state(Primitives)', function () {
  // eslint-disable-next-line
  const { state } = require('../src/bem')

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
  const { state } = require('../src/bem')

  expect(state('is', 'readonly')).toStrictEqual(['is-readonly'])

  config.separator.state = '__'

  expect(state('is', 'readonly')).toStrictEqual(['is__readonly'])
})
