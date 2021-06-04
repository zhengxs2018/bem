/// <reference types="cypress" />

import { createBEM } from '../../src/index'
import { Options } from '../../src/index'

describe('create/createBEM', () => {
  it('createBEM()', function () {
    const bem = createBEM()
    const button = bem('button')

    expect(button.component()).to.deep.equal('c-button')
    expect(button.element('icon')).to.deep.equal('c-button__icon')
    expect(button.modifier('default')).to.deep.equal('c-button--default')
    expect(button.state('is', 'default')).to.deep.equal('is-default')
    expect(button.is('loading')).to.deep.equal('is-loading')
    expect(button.has('error')).to.deep.equal('has-error')

    // 不管调用几次，拿到的都是同一个对象
    expect(button).to.equal(bem('button'))

    // 不同名称拿到的是不同的对象
    expect(button).not.to.equal(bem('icon'))

    // 不同的 create，即使是相同的名称拿到的也不一样的
    expect(button).not.to.equal(createBEM()('button'))
  })

  it('createBEM(namespace)', function () {
    const options: Required<Pick<Options, 'namespace'>> = {
      namespace: {},
    }

    const bem = createBEM(options)

    const button = bem('button')

    expect(button.component()).to.deep.equal('c-button')
    expect(button.element('icon')).to.deep.equal('c-button__icon')
    expect(button.modifier('default')).to.deep.equal('c-button--default')

    options['namespace']['component'] = 'md'

    expect(button.component()).to.deep.equal('md-button')
    expect(button.element('icon')).to.deep.equal('md-button__icon')
    expect(button.modifier('default')).to.deep.equal('md-button--default')

    options['namespace']['component'] = 'c'

    expect(button.component()).to.deep.equal('c-button')
    expect(button.element('icon')).to.deep.equal('c-button__icon')
    expect(button.modifier('default')).to.deep.equal('c-button--default')

    options['namespace'] = {
      component: 'ux',
    }

    expect(button.component()).to.deep.equal('ux-button')
    expect(button.element('icon')).to.deep.equal('ux-button__icon')
    expect(button.modifier('default')).to.deep.equal('ux-button--default')
  })

  it('createBEM(separator)', function () {
    const options: Required<Pick<Options, 'separator'>> = {
      separator: {},
    }

    const bem = createBEM(options)

    const button = bem('button')

    expect(button.element('icon')).to.deep.equal('c-button__icon')
    expect(button.modifier('default')).to.deep.equal('c-button--default')
    expect(button.state('is', 'default')).to.deep.equal('is-default')
    expect(button.is('loading')).to.deep.equal('is-loading')
    expect(button.has('error')).to.deep.equal('has-error')

    options['separator']['element'] = '-'
    expect(button.element('icon')).to.deep.equal('c-button-icon')

    options['separator']['element'] = '__'
    expect(button.element('icon')).to.deep.equal('c-button__icon')

    options['separator']['modifier'] = '-'
    expect(button.modifier('default')).to.deep.equal('c-button-default')

    options['separator']['modifier'] = '--'
    expect(button.modifier('default')).to.deep.equal('c-button--default')

    options['separator']['state'] = '#'
    expect(button.state('is', 'default')).to.deep.equal('is#default')
    expect(button.is('loading')).to.deep.equal('is#loading')
    expect(button.has('error')).to.deep.equal('has#error')

    options['separator']['state'] = '-'
    expect(button.state('is', 'default')).to.deep.equal('is-default')
    expect(button.is('loading')).to.deep.equal('is-loading')
    expect(button.has('error')).to.deep.equal('has-error')

    options['separator'] = {
      element: '-',
      modifier: '-',
      state: '#',
    }
    expect(button.element('icon')).to.deep.equal('c-button-icon')
    expect(button.modifier('default')).to.deep.equal('c-button-default')
    expect(button.state('is', 'default')).to.deep.equal('is#default')
    expect(button.is('loading')).to.deep.equal('is#loading')
    expect(button.has('error')).to.deep.equal('has#error')
  })
})
