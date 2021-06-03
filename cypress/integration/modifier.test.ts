/// <reference types="cypress" />

import BEM, { modifier } from '../../src/index'

describe('bem/modifier', () => {
  it('modifier(String)', () => {
    expect(modifier('button', 'default')).to.deep.equal(['button--default'])
  })

  it('modifier(Number)', () => {
    expect(modifier('col', 0)).to.deep.equal(['col--0'])
  })

  it('modifier(Falsy)', () => {
    expect(modifier('button', false)).to.deep.equal([])
    expect(modifier('button', null)).to.deep.equal([])
    expect(modifier('button', undefined)).to.deep.equal([])
  })

  it('modifier(Object)', () => {
    const result = modifier('button', { foo: true, danger: false })
    const expected = ['button--foo']

    expect(result).to.deep.equal(expected)
  })

  it('modifier(Primitives)', () => {
    const result = modifier(
      'button',
      { foo: true, danger: false },
      [['doc'], { bar: true, test: false }],
      'default',
      1,
      undefined,
      null,
      false
    )
    const expected = [
      'button--foo',
      'button--doc',
      'button--bar',
      'button--default',
      'button--1',
    ]

    expect(result).to.deep.equal(expected)
  })

  it('modifier(globalConfig)', () => {
    expect(modifier('button', 'default')).to.deep.equal(['button--default'])

    BEM.separator.modifier = '-'

    expect(modifier('button', 'default')).to.deep.equal(['button-default'])
  })
})
