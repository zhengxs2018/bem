/// <reference types="@types/jest" />

jest.mock('../src/config')

beforeEach(() => {
  jest.resetModules()
})

test('component()', function () {
  // eslint-disable-next-line
  const { component } = require('../src/bem')

  expect(component('button')).toStrictEqual('c-button')
})

test('component(namespace)', function () {
  // eslint-disable-next-line
  const { component } = require('../src/bem')

  expect(component('button', 'ux')).toStrictEqual('ux-button')
})

test('component(globalConfig)', function () {
  jest.doMock('../src/config', () => {
    return {
      namespace: {
        component: 'c',
      },
    }
  })

  // eslint-disable-next-line
  const config = require('../src/config')

  // eslint-disable-next-line
  const { component } = require('../src/bem')

  expect(component('button')).toStrictEqual('c-button')

  config.namespace.component = 'd'

  expect(component('button')).toStrictEqual('d-button')

  expect(component('button', 'ux')).toStrictEqual('ux-button')
})
