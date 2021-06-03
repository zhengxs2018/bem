/// <reference types="cypress" />

import BEM, { component } from '../../src/index'

describe('bem/component', () => {
  it('component()', () => {
    expect(component('button')).to.deep.equal('c-button')
  })

  it('component(namespace)', () => {
    expect(component('button', 'ux')).to.deep.equal('ux-button')
  })

  it('component(config#namespace.component)', () => {
    expect(component('button')).to.deep.equal('c-button')

    BEM.namespace.component = 'd'

    expect(component('button')).to.deep.equal('d-button')

    expect(component('button', 'ux')).to.deep.equal('ux-button')
  })
})
