/// <reference types="cypress" />

import BEM, { element } from '../../src/index'

describe('bem/element', () => {
  it('element(String)', function () {
    expect(element('button', 'icon')).to.deep.equal('button__icon')
  })

  it('element(Number)', function () {
    expect(element('col', 0)).to.deep.equal('col__0')
  })

  it('element(Falsy)', function () {
    expect(element('button', false)).to.deep.equal([])
    expect(element('button', null)).to.deep.equal([])
    expect(element('button', undefined)).to.deep.equal([])
  })

  it('element(Object)', function () {
    const result = element('button', { foo: true, text: false })
    const expected = ['button__foo']

    expect(result).to.deep.equal(expected)
  })

  it('element(config#separator.element)', () => {
    expect(element('button', 'icon')).to.deep.equal('button__icon')

    BEM.separator.element = '-'

    expect(element('button', 'icon')).to.deep.equal('button-icon')
  })
})
