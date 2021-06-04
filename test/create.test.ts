/// <reference types="@types/jest" />

import { createBEM } from '../src/index'
import { Options } from '../src/index'

test('createBEM()', function () {
  const bem = createBEM()
  const button = bem('button')

  expect(button.component()).toEqual('c-button')
  expect(button.element('icon')).toEqual('c-button__icon')
  expect(button.modifier('default')).toStrictEqual('c-button--default')
  expect(button.state('is', 'default')).toStrictEqual('is-default')
  expect(button.is('loading')).toStrictEqual('is-loading')
  expect(button.has('error')).toStrictEqual('has-error')

  // 不管调用几次，拿到的都是同一个对象
  expect(button).toBe(bem('button'))

  // 不同名称拿到的是不同的对象
  expect(button).not.toBe(bem('icon'))

  // 不同的 create，即使是相同的名称拿到的也不一样的
  expect(button).not.toBe(createBEM()('button'))
})

test('createBEM(namespace)', function () {
  const options: Required<Pick<Options, 'namespace'>> = {
    namespace: {},
  }

  const bem = createBEM(options)

  const button = bem('button')

  expect(button.component()).toEqual('c-button')
  expect(button.element('icon')).toEqual('c-button__icon')
  expect(button.modifier('default')).toStrictEqual('c-button--default')

  options['namespace']['component'] = 'md'

  expect(button.component()).toEqual('md-button')
  expect(button.element('icon')).toEqual('md-button__icon')
  expect(button.modifier('default')).toStrictEqual('md-button--default')

  options['namespace']['component'] = 'c'

  expect(button.component()).toEqual('c-button')
  expect(button.element('icon')).toEqual('c-button__icon')
  expect(button.modifier('default')).toStrictEqual('c-button--default')

  options['namespace'] = {
    component: 'ux',
  }

  expect(button.component()).toEqual('ux-button')
  expect(button.element('icon')).toEqual('ux-button__icon')
  expect(button.modifier('default')).toStrictEqual('ux-button--default')
})

test('createBEM(separator)', function () {
  const options: Required<Pick<Options, 'separator'>> = {
    separator: {},
  }

  const bem = createBEM(options)

  const button = bem('button')

  expect(button.element('icon')).toEqual('c-button__icon')
  expect(button.modifier('default')).toStrictEqual('c-button--default')
  expect(button.state('is', 'default')).toStrictEqual('is-default')
  expect(button.is('loading')).toStrictEqual('is-loading')
  expect(button.has('error')).toStrictEqual('has-error')

  options['separator']['element'] = '-'
  expect(button.element('icon')).toEqual('c-button-icon')

  options['separator']['element'] = '__'
  expect(button.element('icon')).toEqual('c-button__icon')

  options['separator']['modifier'] = '-'
  expect(button.modifier('default')).toStrictEqual('c-button-default')

  options['separator']['modifier'] = '--'
  expect(button.modifier('default')).toStrictEqual('c-button--default')

  options['separator']['state'] = '#'
  expect(button.state('is', 'default')).toStrictEqual('is#default')
  expect(button.is('loading')).toStrictEqual('is#loading')
  expect(button.has('error')).toStrictEqual('has#error')

  options['separator']['state'] = '-'
  expect(button.state('is', 'default')).toStrictEqual('is-default')
  expect(button.is('loading')).toStrictEqual('is-loading')
  expect(button.has('error')).toStrictEqual('has-error')

  options['separator'] = {
    element: '-',
    modifier: '-',
    state: '#',
  }
  expect(button.element('icon')).toEqual('c-button-icon')
  expect(button.modifier('default')).toStrictEqual('c-button-default')
  expect(button.state('is', 'default')).toStrictEqual('is#default')
  expect(button.is('loading')).toStrictEqual('is#loading')
  expect(button.has('error')).toStrictEqual('has#error')
})
