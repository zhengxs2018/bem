/// <reference types="cypress" />

import { has } from '../../src/index'

describe('bem/has', () => {

  it('has(String)', function () {
    expect(has('loading')).to.deep.equal('has-loading')
  })

  it('has(Number)', function () {
    expect(has(0)).to.deep.equal('has-0')
  })

  it('has(Falsy)', function () {
    expect(has(false)).to.deep.equal([])
    expect(has(null)).to.deep.equal([])
    expect(has(undefined)).to.deep.equal([])
  })

  it('has(Object)', function () {
    const result = has({ loading: true, disabled: false })
    const expected = ['has-loading']

    expect(result).to.deep.equal(expected)
  })

  it('has(Primitives)', function () {
    const result = has(
      { loading: true, disabled: false },
      [['doc'], { bar: true, test: false }],
      'readonly',
      1,
      undefined,
      null,
      false
    )
    const expected = ['has-loading', 'has-doc', 'has-bar', 'has-readonly', 'has-1']

    expect(result).to.deep.equal(expected)
  })
})
