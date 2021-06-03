/// <reference types="cypress" />

import BEM, { state } from '../../src/index'

describe('bem/state', () => {
  it('state(String)', () => {
    expect(state('is', 'loading')).to.deep.equal(['is-loading'])
  })

  it('state(Number)', () => {
    expect(state('is', 0)).to.deep.equal(['is-0'])
  })

  it('state(Falsy)', () => {
    expect(state('is', false)).to.deep.equal([])
    expect(state('is', null)).to.deep.equal([])
    expect(state('is', undefined)).to.deep.equal([])
  })

  it('state(Object)', () => {
    const result = state('is', { loading: true, disabled: false })
    const expected = ['is-loading']

    expect(result).to.deep.equal(expected)
  })

  it('state(Primitives)', () => {
    const result = state(
      'is',
      { loading: true, disabled: false },
      [['doc'], { bar: true, test: false }],
      'readonly',
      1,
      undefined,
      null,
      false
    )
    const expected = ['is-loading', 'is-doc', 'is-bar', 'is-readonly', 'is-1']

    expect(result).to.deep.equal(expected)
  })

  it('state(globalConfig)', () => {
    expect(state('is', 'readonly')).to.deep.equal(['is-readonly'])

    BEM.separator.state = '-'

    expect(state('is', 'readonly')).to.deep.equal(['is-readonly'])
  })
})
