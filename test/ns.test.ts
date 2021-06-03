/// <reference types="@types/jest" />

import { createNamespace } from '../src/index'

test('createNamespace(default)', function () {
  const [name, bem] = createNamespace('button')

  expect(name).toEqual('c-button')

  expect(bem.element('icon')).toEqual('c-button__icon')

  expect(bem.element(['icon', 'text'])).toStrictEqual(["c-button__icon", "c-button__text"])

  expect(bem.element({ icon: true, text: false })).toStrictEqual(["c-button__icon"])

  expect(bem.modifier('default')).toStrictEqual("c-button--default")

  expect(bem.modifier(['default', 'primary'])).toStrictEqual(["c-button--default", "c-button--primary"])

  expect(bem.modifier({ default: true, primary: false })).toStrictEqual(["c-button--default"])
})

test('createNamespace(namespace)', function () {
  const [name, bem] = createNamespace('button', {
    namespace: { component: 'ux' }
  })

  expect(name).toEqual('ux-button')

  expect(bem.element('icon')).toEqual('ux-button__icon')

  expect(bem.element(['icon', 'text'])).toStrictEqual(["ux-button__icon", "ux-button__text"])

  expect(bem.element({ icon: true, text: false })).toStrictEqual(["ux-button__icon"])

  expect(bem.modifier('default')).toStrictEqual("ux-button--default")

  expect(bem.modifier(['default', 'primary'])).toStrictEqual(["ux-button--default", "ux-button--primary"])

  expect(bem.modifier({ default: true, primary: false })).toStrictEqual(["ux-button--default"])
})

test('createNamespace(separator)', function () {
  const [name, bem] = createNamespace('button', {
    separator: { element: '-', modifier: '__' }
  })

  expect(name).toEqual('c-button')

  expect(bem.element('icon')).toEqual('c-button-icon')

  expect(bem.element(['icon', 'text'])).toStrictEqual(["c-button-icon", "c-button-text"])

  expect(bem.element({ icon: true, text: false })).toStrictEqual(["c-button-icon"])

  expect(bem.modifier('default')).toStrictEqual("c-button__default")

  expect(bem.modifier(['default', 'primary'])).toStrictEqual(["c-button__default", "c-button__primary"])

  expect(bem.modifier({ default: true, primary: false })).toStrictEqual(["c-button__default"])
})


test('createNamespace(options)', function () {
  const [name, bem] = createNamespace('button', {
    namespace: { component: 'ux' },
    separator: { element: '-', modifier: '__' }
  })

  expect(name).toEqual('ux-button')

  expect(bem.element('icon')).toEqual('ux-button-icon')

  expect(bem.element(['icon', 'text'])).toStrictEqual(["ux-button-icon", "ux-button-text"])

  expect(bem.element({ icon: true, text: false })).toStrictEqual(["ux-button-icon"])

  expect(bem.modifier('default')).toStrictEqual("ux-button__default")

  expect(bem.modifier(['default', 'primary'])).toStrictEqual(["ux-button__default", "ux-button__primary"])

  expect(bem.modifier({ default: true, primary: false })).toStrictEqual(["ux-button__default"])
})
