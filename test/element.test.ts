/// <reference types="@types/jest" />

jest.mock('../src/config')

beforeEach(() => {
  jest.resetModules()
})

test('element(String)', function () {
  // eslint-disable-next-line
  const { element } = require('../src/bem')

  expect(element('button', 'icon')).toStrictEqual(['button__icon'])
})

test('element(Number)', function () {
  // eslint-disable-next-line
  const { element } = require('../src/bem')

  expect(element('col', 0)).toStrictEqual(['col__0'])
})

test('element(Falsy)', function () {
  // eslint-disable-next-line
  const { element } = require('../src/bem')

  expect(element('button', false)).toStrictEqual([])
  expect(element('button', null)).toStrictEqual([])
  expect(element('button', undefined)).toStrictEqual([])
})

test('element(Object)', function () {
  // eslint-disable-next-line
  const { element } = require('../src/bem')

  const result = element('button', { foo: true, text: false })
  const expected = ['button__foo']

  expect(result).toStrictEqual(expected)
})

test('element(Primitives)', function () {
  // eslint-disable-next-line
  const { element } = require('../src/bem')

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

test('element(globalConfig)', function () {
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
  const { element } = require('../src/bem')

  expect(element('button', 'icon')).toStrictEqual(['button__icon'])

  config.separator.element = '-'

  expect(element('button', 'icon')).toStrictEqual(['button-icon'])
})
