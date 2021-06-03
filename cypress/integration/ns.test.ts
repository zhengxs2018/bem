/// <reference types="cypress" />

import { createNamespace } from '../../src/index'

describe('ns/createNamespace', () => {
  it('createNamespace(default)', function () {
    const [name, bem] = createNamespace('button')

    expect(name).to.deep.equal('c-button')

    expect(bem.element('icon')).to.deep.equal('c-button__icon')

    expect(bem.element(['icon', 'text'])).to.deep.equal(["c-button__icon", "c-button__text"])

    expect(bem.element({ icon: true, text: false })).to.deep.equal(["c-button__icon"])

    expect(bem.modifier('default')).to.deep.equal("c-button--default")

    expect(bem.modifier(['default', 'primary'])).to.deep.equal(["c-button--default", "c-button--primary"])

    expect(bem.modifier({ default: true, primary: false })).to.deep.equal(["c-button--default"])
  })

  it('createNamespace(namespace)', function () {
    const [name, bem] = createNamespace('button', {
      namespace: { component: 'ux' }
    })

    expect(name).to.deep.equal('ux-button')

    expect(bem.element('icon')).to.deep.equal('ux-button__icon')

    expect(bem.element(['icon', 'text'])).to.deep.equal(["ux-button__icon", "ux-button__text"])

    expect(bem.element({ icon: true, text: false })).to.deep.equal(["ux-button__icon"])

    expect(bem.modifier('default')).to.deep.equal("ux-button--default")

    expect(bem.modifier(['default', 'primary'])).to.deep.equal(["ux-button--default", "ux-button--primary"])

    expect(bem.modifier({ default: true, primary: false })).to.deep.equal(["ux-button--default"])
  })

  it('createNamespace(separator)', function () {
    const [name, bem] = createNamespace('button', {
      separator: { element: '-', modifier: '__' }
    })

    expect(name).to.deep.equal('c-button')

    expect(bem.element('icon')).to.deep.equal('c-button-icon')

    expect(bem.element(['icon', 'text'])).to.deep.equal(["c-button-icon", "c-button-text"])

    expect(bem.element({ icon: true, text: false })).to.deep.equal(["c-button-icon"])

    expect(bem.modifier('default')).to.deep.equal("c-button__default")

    expect(bem.modifier(['default', 'primary'])).to.deep.equal(["c-button__default", "c-button__primary"])

    expect(bem.modifier({ default: true, primary: false })).to.deep.equal(["c-button__default"])
  })

  it('createNamespace(options)', function () {
    const [name, bem] = createNamespace('button', {
      namespace: { component: 'ux' },
      separator: { element: '-', modifier: '__' }
    })

    expect(name).to.deep.equal('ux-button')

    expect(bem.element('icon')).to.equal('ux-button-icon')

    expect(bem.element(['icon', 'text'])).to.deep.equal(["ux-button-icon", "ux-button-text"])

    expect(bem.element({ icon: true, text: false })).to.deep.equal(["ux-button-icon"])

    expect(bem.modifier('default')).to.equal("ux-button__default")

    expect(bem.modifier(['default', 'primary'])).to.deep.equal(["ux-button__default", "ux-button__primary"])

    expect(bem.modifier({ default: true, primary: false })).to.deep.equal(["ux-button__default"])
  })
})
