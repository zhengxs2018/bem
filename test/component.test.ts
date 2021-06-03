/// <reference types="@types/jest" />

import { component } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

test('component()', function () {
  expect(component('button')).toStrictEqual('c-button')
})

test('component(namespace)', function () {
  expect(component('button', 'ux')).toStrictEqual('ux-button')
})

test('component(namespace)', function () {
  jest.doMock('../src/config', () => {
    return { namespace: { component: 'f' } }
  })

  // eslint-disable-next-line
  const { namespace, component } = require('../src/index')

  expect(component('button')).toStrictEqual('f-button')

  namespace.component = 'd'

  expect(component('button')).toStrictEqual('d-button')

  expect(component('button', 'ux')).toStrictEqual('ux-button')
})
