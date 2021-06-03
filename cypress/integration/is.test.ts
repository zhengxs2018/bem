/// <reference types="cypress" />

import { is } from '../../src/index'

describe('bem/is', () => {
  it('is(String)', () => {
    expect(is('loading')).to.deep.equal(['is-loading'])
  })

  it('is(Number)', () => {
    expect(is(0)).to.deep.equal(['is-0'])
  })

  it('is(Falsy)', () => {
    expect(is(false)).to.deep.equal([])
    expect(is(null)).to.deep.equal([])
    expect(is(undefined)).to.deep.equal([])
  })

  it('is(Object)', () => {
    const result = is({ loading: true, disabled: false })
    const expected = ['is-loading']

    expect(result).to.deep.equal(expected)
  })

  it('is(Primitives)', () => {
    const result = is(
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
})
