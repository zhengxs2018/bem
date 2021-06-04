/// <reference types="@types/jest" />

import { createBEM } from '../src/index'
import { Options } from '../src/index'

test('createBEM(namespace)', function () {
  const bem = createBEM({
    namespace: {
      component: 'ux',
    },
  })

  const [name, button] = bem('button')

  expect(name).toEqual('ux-button')

  expect(button.element('icon')).toEqual('ux-button__icon')

  expect(button.modifier('default')).toStrictEqual('ux-button--default')

  expect(button.state('is', 'default')).toStrictEqual('is-default')

  expect(button.is('loading')).toStrictEqual('is-loading')

  expect(button.has('error')).toStrictEqual('has-error')
})

test('createBEM(separator)', function () {
  const bem = createBEM({
    namespace: {
      component: 'ux',
    },
    separator: {
      element: '-',
      modifier: '-',
      state: '--',
    },
  })

  const [name, button] = bem('button')

  expect(name).toEqual('ux-button')

  expect(button.element('icon')).toEqual('ux-button-icon')

  expect(button.modifier('default')).toStrictEqual('ux-button-default')

  expect(button.state('is', 'default')).toStrictEqual('is--default')

  expect(button.is('loading')).toStrictEqual('is--loading')

  expect(button.has('error')).toStrictEqual('has--error')
})

test('createBEM(cache)', function () {
  const options: Options = {}

  const bem = createBEM(options)

  const button = bem('button')[1]

  expect(button).toBe(bem('button')[1])

  options.separator =  {
    element: '-'
  }

  const button2 = bem('button')[1]

  expect(button.elem('text')).toEqual(button2.elem('text'))
  expect(options.separator).toStrictEqual({ element: '-', modifier: '--', state: '-' })

  const button3 = bem('button')[1]
  expect(button.elem('text')).toStrictEqual(button3.elem('text'))
})

test('createBEM(lazy)', function () {
  const options: Options = {}

  const bem = createBEM(options)

  const [buttonCls, btnBEM] = bem('button')

  expect(buttonCls).toEqual('c-button')

  expect(btnBEM.element('icon')).toEqual('c-button__icon')

  expect(btnBEM.modifier('default')).toStrictEqual('c-button--default')

  expect(btnBEM.state('is', 'default')).toStrictEqual('is-default')

  expect(btnBEM.is('loading')).toStrictEqual('is-loading')

  expect(btnBEM.has('error')).toStrictEqual('has-error')

  options.namespace = {
    component: 'ux',
  }

  options.separator = {
    element: '-',
    modifier: '-',
    state: '--',
  }

  const [iconCls, iconBEM] = bem('icon')

  expect(iconCls).toEqual('ux-icon')

  expect(iconBEM.element('info')).toEqual('ux-icon-info')

  expect(iconBEM.modifier('dot')).toStrictEqual('ux-icon-dot')

  expect(iconBEM.state('is', 'default')).toStrictEqual('is--default')

  expect(iconBEM.is('loading')).toStrictEqual('is--loading')

  expect(iconBEM.has('error')).toStrictEqual('has--error')
})
