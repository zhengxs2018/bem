/// <reference types="cypress" />

import { createBEM } from '../../src/index'
import { Options } from '../../src/index'

describe('create/createBEM', () => {
  it('createBEM(namespace)', function () {
    const bem = createBEM({
      namespace: {
        component: 'ux',
      },
    })

    const [name, button] = bem('button')

    expect(name).to.deep.equal('ux-button')

    expect(button.element('icon')).to.deep.equal('ux-button__icon')

    expect(button.modifier('default')).to.deep.equal('ux-button--default')

    expect(button.state('is', 'default')).to.deep.equal('is-default')

    expect(button.is('loading')).to.deep.equal('is-loading')

    expect(button.has('error')).to.deep.equal('has-error')
  })

  it('createBEM(separator)', function () {
    const bem = createBEM({
      namespace: {
        component: 'ux',
      },
      separator: {
        element: '-',
        modifier: '-',
        state: '--',
      },
    })

    const [name, button] = bem('button')

    expect(name).to.deep.equal('ux-button')

    expect(button.element('icon')).to.deep.equal('ux-button-icon')

    expect(button.modifier('default')).to.deep.equal('ux-button-default')

    expect(button.state('is', 'default')).to.deep.equal('is--default')

    expect(button.is('loading')).to.deep.equal('is--loading')

    expect(button.has('error')).to.deep.equal('has--error')
  })

  it('createBEM(lazy)', function () {
    const options: Options = {}

    const bem = createBEM(options)

    const [buttonCls, btnBEM] = bem('button')

    expect(buttonCls).to.deep.equal('c-button')

    expect(btnBEM.element('icon')).to.deep.equal('c-button__icon')

    expect(btnBEM.modifier('default')).to.deep.equal('c-button--default')

    expect(btnBEM.state('is', 'default')).to.deep.equal('is-default')

    expect(btnBEM.is('loading')).to.deep.equal('is-loading')

    expect(btnBEM.has('error')).to.deep.equal('has-error')

    options.namespace = {
      component: 'ux',
    }

    options.separator = {
      element: '-',
      modifier: '-',
      state: '--',
    }

    const [iconCls, iconBEM] = bem('icon')

    expect(iconCls).to.deep.equal('ux-icon')

    expect(iconBEM.element('info')).to.deep.equal('ux-icon-info')

    expect(iconBEM.modifier('dot')).to.deep.equal('ux-icon-dot')

    expect(iconBEM.state('is', 'default')).to.deep.equal('is--default')

    expect(iconBEM.is('loading')).to.deep.equal('is--loading')

    expect(iconBEM.has('error')).to.deep.equal('has--error')
  })
})
