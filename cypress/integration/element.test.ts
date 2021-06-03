/// <reference types="cypress" />

import BEM, { element } from '../../src/index'

describe('bem/element', () => {
  it('element(String)', () => {
    expect(element('button', 'icon')).to.deep.equal(['button__icon'])
  })

  it('element(Number)', () => {
    expect(element('col', 0)).to.deep.equal(['col__0'])
  })

  it('element(Falsy)', () => {
    expect(element('button', false)).to.deep.equal([])
    expect(element('button', null)).to.deep.equal([])
    expect(element('button', undefined)).to.deep.equal([])
  })

  it('element(Object)', () => {
    const result = element('button', { foo: true, text: false })
    const expected = ['button__foo']

    expect(result).to.deep.equal(expected)
  })

  it('element(Primitives)', () => {
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

    expect(result).to.deep.equal(expected)
  })

  it('element(globalConfig)', () => {
    expect(element('button', 'icon')).to.deep.equal(['button__icon'])

    BEM.separator.element = '-'

    expect(element('button', 'icon')).to.deep.equal(['button-icon'])
  })
})
